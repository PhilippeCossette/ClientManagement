import { supabase } from "../../lib/supabase";
import type { Client } from "./type";

export async function getClients() {
  const { data, error } = await supabase.from("clients").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createClient(client: Client) {
  const { data, error } = await supabase
    .from("clients")
    .insert(client)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
