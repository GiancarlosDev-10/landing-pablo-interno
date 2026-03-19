// Función para obtener el conteo de usuarios desde Google Sheets
export async function fetchUserCount(): Promise<number> {
  try {
    const SHEET_ID = import.meta.env.PUBLIC_SHEET_ID;

    if (!SHEET_ID) {
      console.warn("SHEET_ID no configurado, usando valor por defecto 0");
      return 0;
    }

    // Agregar timestamp para evitar caché
    const timestamp = Date.now();
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&t=${timestamp}`;

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching sheet: ${response.status} ${response.statusText}`,
      );
    }

    const csvText = await response.text();

    // Dividir por líneas y filtrar líneas vacías
    const lines = csvText.split("\n").filter((line) => line.trim());

    // Excluir el header (primera línea) y contar filas con datos
    const dataRows = lines.slice(1).filter((line) => line.trim());

    return dataRows.length;
  } catch (error) {
    console.error("Error fetching user count:", error);
    // Fallback a 0 si hay error
    return 0;
  }
}
