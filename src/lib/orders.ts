import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/lib/cart";
import type { CustomerInfo, PaymentMode } from "@/lib/checkout";

export type SubmitOrderInput = {
  ref: string;
  lang: "fr" | "ar";
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  mode: PaymentMode;
  source?: string;
};

/**
 * Persist a new order in Lovable Cloud so it survives even if the customer
 * never sends the WhatsApp message. Failures are swallowed — the checkout
 * UX must never break because of a backend hiccup.
 */
export async function persistOrder(input: SubmitOrderInput): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        ref: input.ref,
        customer_name: input.customer.name,
        customer_phone: input.customer.phone,
        city: input.customer.city,
        address: input.customer.address,
        note: input.customer.note ?? null,
        items: input.items,
        total_mad: input.total,
        payment_mode: input.mode,
        lang: input.lang,
        source: input.source ?? null,
      })
      .select("id")
      .single();
    if (error) {
      console.warn("[orders] persist failed", error);
      return null;
    }
    return data?.id ?? null;
  } catch (e) {
    console.warn("[orders] persist threw", e);
    return null;
  }
}

/**
 * Upload a wire-transfer proof and return a long-lived signed URL the
 * seller can open from WhatsApp.
 */
export async function uploadProofAndSign(
  ref: string,
  file: File
): Promise<{ path: string; signedUrl: string } | null> {
  try {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${ref}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("order-proofs")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (upErr) {
      console.warn("[orders] upload failed", upErr);
      return null;
    }
    // 30 days
    const { data, error } = await supabase.storage
      .from("order-proofs")
      .createSignedUrl(path, 60 * 60 * 24 * 30);
    if (error || !data?.signedUrl) {
      console.warn("[orders] sign failed", error);
      return null;
    }
    return { path, signedUrl: data.signedUrl };
  } catch (e) {
    console.warn("[orders] upload threw", e);
    return null;
  }
}

export async function attachProofUrl(orderId: string, url: string): Promise<void> {
  try {
    await supabase.from("orders").update({ proof_url: url }).eq("id", orderId);
  } catch (e) {
    console.warn("[orders] attach proof failed", e);
  }
}
