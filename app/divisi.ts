// Server-only: imported by actions.ts, so each applicant receives just their own group link.

export type Penerimaan = {
  posisi: string; // shown under "resmi diterima sebagai"
  subdivisi?: string; // Management Team members also see their division
  grup: string; // WhatsApp button label
  link: string;
  management: boolean;
};

const PM = "https://chat.whatsapp.com/BsQdd15aGnaGjvqVZfXK1M?s=cl&p=a&iam=2";
const UIUX = "https://chat.whatsapp.com/KtqN3HSbROb10ovqQI75XO?s=cl&p=a&iam=2";
const FE = "https://chat.whatsapp.com/GMhb4nDan528BoslWrrzCB?s=cl&p=a&iam=2";
const BE = "https://chat.whatsapp.com/JhgzOL7p72R4nars9XObTR?s=cl&p=a&iam=2";
const MANAGEMENT = "https://chat.whatsapp.com/L2DHiadetbILjYq4uZNp7f";

function tim(posisi: string, link: string): Penerimaan {
  return { posisi, grup: `JOIN ${posisi.toUpperCase()} GROUP`, link, management: false };
}

function management(subdivisi: string): Penerimaan {
  return {
    posisi: "Management Team Flexoo 2027",
    subdivisi,
    grup: "JOIN FLEXOO COMMUNITY AND JOIN YOUR DIVISION GROUP",
    link: MANAGEMENT,
    management: true,
  };
}

/** Keys are the accepted values of the `divisi` column in data/lolos.csv (case-insensitive). */
export const DIVISI: Record<string, Penerimaan> = {
  "project manager": tim("Project Manager", PM),
  "ui/ux designer": tim("UI/UX Designer", UIUX),
  "frontend developer": tim("Frontend Developer", FE),
  "backend developer": tim("Backend Developer", BE),
  "business development": management("Business Development"),
  "academy lead": management("Academy Lead"),
};
