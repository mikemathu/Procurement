using System.ComponentModel.DataAnnotations;

namespace Procurement.Models
{
    public class PurchaseOrder
    {
        [Key]
        public int LPONo { get; set; }
        public string Supplier { get; set; }
        public string Alias { get; set; }
        public string CreatedOn { get; set; }
        public string CheckedBy { get; set; }
        public string ApprovedBy { get; set; }
        public string OrderReference { get; set; }
        public DateTime ValidityDate { get; set; }
        public DateTime DateIssued { get; set; }
        public String TermsAndCondition { get; set; }
    }
}
