// Función para obtener el conteo de usuarios desde Google Sheets
export async function fetchUserCount(): Promise<number> {
  try {
    const SHEET_ID = import.meta.env.PUBLIC_SHEET_ID;

    if (!SHEET_ID) {
      console.warn("SHEET_ID no configurado, usando valor por defecto 0");
      return 0;
    }

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
    const lines = csvText.split("\n").filter((line) => line.trim());

    // Obtener índice de la columna "tipo" desde el header
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const tipoIndex = headers.indexOf("tipo");

    if (tipoIndex === -1) {
      // Si no existe la columna tipo, cuenta todas las filas
      return lines.slice(1).filter((line) => line.trim()).length;
    }

    // Contar solo filas donde tipo = "pagado"
    const dataRows = lines.slice(1).filter((line) => {
      const cols = line.split(",");
      return cols[tipoIndex]?.trim().toLowerCase() === "pagado";
    });

    return dataRows.length;
  } catch (error) {
    console.error("Error fetching user count:", error);
    return 0;
  }
}
