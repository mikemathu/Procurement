using System.ComponentModel.DataAnnotations;

namespace Procurement.Models
{
    public class PaymentVourcher
    {
        [Key]
        public int InvoiceNumber { get; set; }
        public string Supplier{ get; set; }
        public string? Alias{ get; set; }
        public DateTime Date{ get; set; }
        public int Balance{ get; set; }
        public int ApprovedAmount{ get; set; }
        public int ApprovalStatus{ get; set; }

    }

}
