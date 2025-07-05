import type { Lead } from "@/types/dashboard";
import { parseCSVData, rawData } from "@/data/salesData";

export class Mensagem {
  static async list(_order: string = "-created_date", limit = 1000): Promise<Lead[]> {
    const data = parseCSVData(rawData);
    return data.slice(0, limit);
  }
}
