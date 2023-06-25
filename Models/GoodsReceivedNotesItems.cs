using System.ComponentModel.DataAnnotations;

namespace Procurement.Models
{
    public class GoodsReceivedNotesItems 
    {
        [Key]
        public int ItemId { get; set; }
        public string Name { get; set; }
        public int UnitCost { get; set; }
        public int QuantityOrdered { get; set; }
        public int QuantityReceived { get; set; }
        public int UnitPrice { get; set; }
        public string BatchNo { get; set; }
        public int Discount { get; set; }
        public int BonusReceived { get; set; }
        public int Checked { get; set; }
        public int Approved { get; set; }
        public int Commited { get; set; }
    }
}
