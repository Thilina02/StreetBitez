declare module 'html2pdf.js' {
    interface HTML2PDFOptions {
      margin?: number;
      // Add other options here
    }
  
    interface HTML2PDF {
      from(element: HTMLElement): HTML2PDF;
      toPdf(): Promise<Blob>;
    }
  
    function html2pdf(options: HTML2PDFOptions): HTML2PDF;
  }
  
  