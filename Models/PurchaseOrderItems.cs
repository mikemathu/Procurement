using System.ComponentModel.DataAnnotations;

namespace Procurement.Models
{
    public class PurchaseOrderItems
    {
        [Key]
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int IsStockItem { get; set; }
        public int UnitCost { get; set; }
        public int PurchasingQuantity { get; set; }
        public int PurchasingUnits { get; set; }
        public int VAT { get; set; }
        public int DISC { get; set; }
        public string AssetSuAccount { get; set; }
        public string ExpenseSubAccount { get; set; }
        public string IncomeSubAccount { get; set; }
        public int Checked { get; set; }
        public int Approved { get; set; }
        public int Authorized { get; set; }

    }
}
