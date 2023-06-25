using System.ComponentModel.DataAnnotations;

namespace Procurement.Models
{
    public class PurchaseRequisitionNoteItems
    {
        [Key]
        public int ItemNo { get; set; }
        public string ItemName { get; set; }
        public string ItemType { get; set; }
        public int UnitCost { get; set; }
        public int QuantityOrdered { get; set; }
        public int QuantityReceived { get; set; }
        public int Units { get; set; }
        public int Authorized { get; set; }
        public int PurchaseOrderGenerated { get; set; }

    }
}
