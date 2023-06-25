using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Procurement.Models;

namespace Procurement.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }   
     
        public DbSet<GoodsReceivedNotes> GoodsReceivedNotes { get; set; }
        public DbSet<GoodsReceivedNotesItems> GoodsReceivedNotesItems { get; set; }
        public DbSet<PaymentVourcher> PaymentVourcher { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrder { get; set; }
        public DbSet<PurchaseOrderItems> PurchaseOrderItems { get; set; }
        public DbSet<PurchaseRequisitionNote> PurchaseRequisitionNote { get; set; }
        public DbSet<PurchaseRequisitionNoteItems> PurchaseRequisitionNoteItems { get; set; }
        public DbSet<SupplierBills> SupplierBills { get; set; }

    }
}