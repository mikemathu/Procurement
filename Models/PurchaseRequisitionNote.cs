using System.ComponentModel.DataAnnotations;

namespace Procurement.Models
{
    public class PurchaseRequisitionNote
    {
        [Key]
        public int PrnNo { get; set; }
        public DateTime DateCreated { get; set; }
        public string CreatedBy { get; set; }
    }
}
