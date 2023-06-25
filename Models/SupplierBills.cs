using System.ComponentModel.DataAnnotations;

namespace Procurement.Models
{
    public class SupplierBills
    {
        [Key]
        public int BillNumber { get; set; }
        public int InvoiceNumber { get; set; }
        public string Supplier { get; set; }
        public string? Alias { get; set; }
        public DateTime CreatedOn { get; set; }
        public int NetAmount { get; set; }
        public string CreditNote { get; set; }
        public int Balance { get; set; }
        public int ApprovedPayment { get; set; }
        public string Reference { get; set; }
        public string TermsAndCondition { get; set; }
        public DateTime DueDate { get; set; }

    }

}
