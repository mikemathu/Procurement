using System.ComponentModel.DataAnnotations;

namespace Procurement.Models
{
    public class GoodsReceivedNotes
    {
        [Key]
        public int GoodsReceivedNotesNumber { get; set; }
        public string Supplier { get; set; }
        public string PurhcaseOrderNumber { get; set; }
        public string DeliveryNote { get; set; }
        public int InvoiceNumber { get; set; }
        public string OrderReference { get; set; }
    }
}
