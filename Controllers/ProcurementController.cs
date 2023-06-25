using Microsoft.AspNetCore.Mvc;

namespace Procurement.Controllers
{
    public class ProcurementController : Controller
    {
        public IActionResult Suppliers()
        {
            return View();
        }

        public IActionResult SupplierBills()
        {
            return View();
        } 
        public IActionResult PurchaseRequisitionNote()
        {
            return View();
        }       
        public IActionResult PurchaseOrder()
        {
            return View();
        }
        public IActionResult GoodsReceivedNotes()
        {
            return View();
        }
        public IActionResult PaymentVouchers()
        {
            return View();
        }
        public IActionResult SupplierPrepayments()
        {
            return View();
        }
    }
}
