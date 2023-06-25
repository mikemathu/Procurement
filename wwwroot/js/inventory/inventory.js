function ReloadPage() {
    LoadAllStorageLocations();
    LoadAllItemCategories();
    LoadAllItemClasses();
    LoadDepartments();
    LoadAllInventorySubAccounts();
    LoadAllRevenueSubAccounts();
    LoadAllCostOfSaleSubAccounts();
    LoadAllVatTypes();
    LoadAllOtherTaxes();
    LoadAllUnitOfMeasures();
}
function LoadDepartments() {
    AjaxServerCallAsync("GET", "/Configurations/GetAllDepartments/", "", "", function (n) {
        var i = n.response,
            r,
            t,
            u;
        if (n.status && !$.isEmptyObject(i)) for (r = $("#ItemCategory_DepartmentID"), r.empty(), r.append("<option></option>"), t = 0; t < i.length; t++) (u = new Option(i[t].name, i[t].departmentID)), r.append(u);
    });
}
function LoadAllItemCategories() {
    let n = $("#Item_ItemCategoryID");
    n.empty();
    n.append("<option></option>");
    let t = $("#OpenStockItemCategoryIds");
    t.empty();
    t.append("<option></option>");
    GetOrPostAsync("GET", "/Configurations/GetAllItemCategories/", "", "")
        .then((i) => {
            var u, r;
            if ((categoriesTable.clear().draw(), !$.isEmptyObject(i))) {
                for (u = "", r = 0; r < i.length; r++)
                    n.append(new Option(i[r].name, i[r].itemCategoryID)),
                        t.append(new Option(i[r].name, i[r].itemCategoryID)),
                        (u += '<tr id="' + i[r].itemCategoryID + '"><td data-title="Item Category ID">' + i[r].itemCategoryID + '</td><td data-title="Name">' + i[r].name + '</td><td data-title="Code">' + i[r].code + "</td></tr>");
                categoriesTable.rows.add($(u)).draw(!1);
            }
        })
        .catch((n) => Notify(!1, n));
}
function GetItemCategoryDetails(n) {
    var t = n,
        i = $("#ItemCategoryForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Configurations/GetItemCategoryDetails/", t, i)
        .then((n) => {
            $("#ItemCategory_ItemCategoryID").val(n.itemCategoryID),
                $("#ItemCategory_Name").val(n.name),
                $("#ItemCategory_Description").val(n.description),
                $("#ItemCategory_Code").val(n.code),
                $("#ItemCategory_DepartmentID").val(n.departmentID),
                $("#additemcat").hide(),
                $("#updateitemcat").show();
        })
        .catch((n) => Notify(!1, n));
}
function DeleteItemCategory(n) {
    var t = n,
        i = $("#ItemCategoryForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Configurations/DeleteItemCategory/", t, i)
        .then(() => {
            LoadAllItemCategories(), Notify(!0, "Item Category Deleted Successfully");
        })
        .catch((n) => Notify(!1, n));
}
function LoadAllItemClasses() {
    var n = $("#Item_ItemClassID");
    n.empty();
    n.append("<option></option>");
    GetOrPostAsync("GET", "/Configurations/GetAllItemClasses/", "", "")
        .then((t) => {
            var r, i;
            if ((classesTable.clear().draw(), !$.isEmptyObject(t))) {
                for (r = "", i = 0; i < t.length; i++) {
                    let u = new Option(t[i].name, t[i].itemClassID);
                    n.append(u);
                    r += '<tr id="' + t[i].itemClassID + '"><td data-title="Item Class ID">' + t[i].itemClassID + '</td><td data-title="Name">' + t[i].name + "</td></tr>";
                }
                classesTable.rows.add($(r)).draw(!1);
            }
        })
        .catch((n) => Notify(!1, n));
}
function GetItemClassDetails(n) {
    var t = n,
        i = $("#ItemClassForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Configurations/GetItemClassDetails/", t, i)
        .then((n) => {
            $("#ItemClass_ItemClassID").val(n.itemClassID),
                $("#ItemClass_Name").val(n.name),
                $("#ItemClass_Description").val(n.description),
                $("#ItemClass_ItemClassType").val(n.itemClassType),
                $("#additemclass").hide(),
                $("#updateitemclass").show();
        })
        .catch((n) => Notify(!1, n));
}
function DeleteItemClass(n) {
    var t = n,
        i = $("#ItemClassForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Configurations/DeleteItemClass/", t, i)
        .then(() => {
            LoadAllItemClasses(), Notify(!0, "Item Class Deleted Successfully");
        })
        .catch((n) => Notify(!1, n));
}
function AddItemCategory(n, t) {
    var i = { StorageLocationID: t, ItemCategoryID: n },
        r = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Configurations/AddItemCategory/", i, r)
        .then((n) => {
            if (!$.isEmptyObject(n)) {
                let t = new Option(n.name, n.itemCategoryID, !0, !0);
                $("#Item_ItemCategoryID").append(t);
            }
        })
        .catch((n) => Notify(!1, n));
}
function GetInventoryItemDetails(n) {
    var t = n,
        i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    AjaxServerCallAsync("POST", "/Inventory/GetProductDetails/", t, i, function (n) {
        var t = n.response;
        if (n.status) {
            $("#btnCreateNewProduct").click();
            let n = new Date(t.itemStorageLocation.expiryDate);
            $(`#Item_ItemCategoryID option[value='${t.item.itemCategoryID}']`).length > 0 ? $("#Item_ItemCategoryID").val(t.item.itemCategoryID) : AddItemCategory(t.item.itemCategoryID, t.itemStorageLocation.storageLocationID);
            $("#Item_ItemID").val(t.item.itemID);
            $("#Item_Name").val(t.item.name);
            $(".prod-name").text(t.item.name);
            $("#Item_ItemClassID").val(t.item.itemClassID);
            $("#CompanyBranchItem_AssetSubAccountID").val(t.companyBranchItem.assetSubAccountID);
            $("#CompanyBranchItem_CompanyBranchItemID").val(t.companyBranchItem.companyBranchItemID);
            $("#CompanyBranchItem_CostOfSaleSubAccountID").val(t.companyBranchItem.costOfSaleSubAccountID);
            $("#CompanyBranchItem_RevenueSubAccountID").val(t.companyBranchItem.revenueSubAccountID);
            $("#CompanyBranchItem_VATTypeID").val(t.companyBranchItem.vatTypeID);
            $("#CompanyBranchItem_OtherTaxID").val(t.companyBranchItem.otherTaxID);
            $("#Item_UnitOfMeasureID").val(t.item.unitOfMeasureID);
            $("#CompanyBranchItem_ItemCode").val(t.companyBranchItem.itemCode);
            $("#CompanyBranchItem_Barcode").val(t.companyBranchItem.barcode);
            $("#ItemStorageLocation_ItemStorageLocationID").val(t.itemStorageLocation.itemStorageLocationID);
            $("#ItemStorageLocation_CompanyBranchItemID").val(t.itemStorageLocation.companyBranchItemID);
            $("#ItemStorageLocation_StorageLocationID").val(t.itemStorageLocation.storageLocationID);
            $("#ItemStorageLocation_UnitCost").val(t.itemStorageLocation.unitCost);
            $("#ItemStorageLocation_Batch").val(t.itemStorageLocation.batch);
            $("#ItemStorageLocation_ExpiryDate").val(n.toLocalISOString().substr(0, 10));
            $("#ItemStorageLocation_AvailableQuantity").val(t.itemStorageLocation.availableQuantity);
            $("#ItemStorageLocation_TotalQuantity").val(t.itemStorageLocation.totalQuantity);
            $("#ItemStorageLocation_ReorderLevel").val(t.itemStorageLocation.reorderLevel);
            $("#UnitPrice").val(t.unitPrice);
            $("#PreviousUnitCost").val(t.itemStorageLocation.unitCost);
            $("#PreviousQuantity").val(t.itemStorageLocation.totalQuantity);
            $("#PreviousUnitPrice").val(t.unitPrice);
            $("#addproduct").hide();
            $("#updateproduct").show();
            goToByScroll("backUp");
        } else Notify(!1, t);
    });
}
function GetItemDetails(n) {
    var t = n,
        i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    AjaxServerCallAsync("POST", "/Inventory/GetItemDetails/", t, i, function (n) {
        var t = n.response;
        n.status
            ? ($("#btnCreateNewProduct").click(),
              $("#Item_ItemID").val(t.itemID),
              $("#Item_Name").val(t.name),
              $("#Item_ItemClassID").val(t.itemClassID),
              $(`#Item_ItemCategoryID option[value='${t.itemCategoryID}']`).length > 0 ? $("#Item_ItemCategoryID").val(t.itemCategoryID) : AddItemCategory(t.itemCategoryID, $("#ItemStorageLocation_StorageLocationID").val()),
              $("#addservice").hide(),
              $("#updateservice").show(),
              goToByScroll("backUp"))
            : Notify(!1, t);
    });
}
function DeleteInventoryItem(n) {
    var t = n,
        i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    AjaxServerCallAsync("POST", "/Inventory/DeleteProduct/", t, i, function (t) {
        var i = t.response;
        t.status ? (Notify(!0, "Inventory Item Deleted Successfully"), productTable.row(`#${n}`).remove().draw()) : Notify(!1, i);
    });
}
function RetireBatch(n) {
    var t = n,
        i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    AjaxServerCallAsync("POST", "/Inventory/RetireBatch/", t, i, function (t) {
        var i = t.response;
        t.status ? (Notify(!0, "Batch Retired Successfully"), productTable.row(`#${n}`).remove().draw()) : Notify(!1, i);
    });
}
function CreateOpeningStock(n, t) {
    var i = [];
    i[0] = $("#ItemStorageLocation_StorageLocationID").val();
    i[1] = n;
    i[2] = t;
    var r = i,
        u = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    AjaxServerCallAsync("POST", "/Inventory/CreateOpeningStockForSingleProduct/", r, u, function (t) {
        var i = t.response;
        if (t.status) {
            GetInventoryItemDetails(i.itemStorageLocation.itemStorageLocationID);
            Notify(!0, "Opening Stock created Successfully");
            productTable.row(`#${n}`).remove().draw();
            let t =
                '<tr style="color: green;" data-branchItemID="' +
                i.companyBranchItem.companyBranchItemID +
                '" data-itemID="' +
                i.item.itemID +
                '" id="' +
                i.itemStorageLocation.itemStorageLocationID +
                '"><td data-title="Name">' +
                i.item.name +
                '</td><td data-title="Batch No">' +
                i.itemStorageLocation.batch +
                '</td><td data-title="Unit Cost">' +
                i.itemStorageLocation.unitCost +
                '</td><td data-title="Unit Price">' +
                i.unitPrice +
                '</td><td data-title="Total Quantity">' +
                i.itemStorageLocation.totalQuantity +
                '</td><td data-title="Available Quantity">' +
                i.itemStorageLocation.availableQuantity +
                '</td><td data-title="Expires On">' +
                formatDate(i.itemStorageLocation.expiryDate) +
                "</td></tr>";
            productTable.row.add($(t)).draw();
        } else Notify(!1, i);
    });
}
function CreateOpeningStockAllItems(n) {
    var t = Ladda.create(document.querySelector("#btnCreateOpeningStockForm"));
    t.start();
    t.isLoading();
    t.setProgress(-1);
    var i = n,
        r = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Inventory/CreateOpeningStockForAllProduct/", i, r)
        .then((n) => {
            t.stop(), Notify(!0, "Opening Stock created Successfully"), LoadProducts(n), $(".create-opening-stock-modal").modal("toggle"), goToByScroll("scrolltohere");
        })
        .catch((n) => {
            t.stop(), Notify(!1, n);
        });
}
function CreateOpeningStockSelectedCategories(n) {
    var t = Ladda.create(document.querySelector("#btnCreateOpeningStockForm"));
    t.start();
    t.isLoading();
    t.setProgress(-1);
    let i = document.querySelectorAll("#OpenStockItemCategoryIds option:checked"),
        r = Array.from(i).map((n) => n.value);
    var u = { StorageLocationID: n, ItemCategoryIds: r },
        f = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Inventory/CreateOpeningStockForProductsByItemCategorys/", u, f)
        .then((n) => {
            t.stop(), Notify(!0, "Opening Stock created Successfully"), $(".create-opening-stock-modal").modal("toggle"), LoadProducts(n), goToByScroll("scrolltohere");
        })
        .catch((n) => {
            t.stop(), Notify(!1, n);
        });
}
function PopulateTableWithOpeningStock(n) {
    if ((productTable.clear().draw(), !$.isEmptyObject(n))) {
        var t = "";
        for (let i = 0; i < n.length; i++) {
            let r = 0;
            try {
                r = n[i].itemStorageLocation.itemStorageLocationID;
            } catch (i) {
                r = 0;
            }
            if (r > 0)
                t +=
                    '<tr style="color: blue;" id="' +
                    r +
                    '"><td data-title="Name">' +
                    n[i].item.name +
                    '</td><td data-title="Batch No">' +
                    n[i].itemStorageLocation.batch +
                    '</td><td data-title="Unit Cost">' +
                    n[i].itemStorageLocation.unitCost +
                    '</td><td data-title="Unit Price">' +
                    n[i].unitPrice +
                    '</td><td data-title="Total Quantity">' +
                    n[i].itemStorageLocation.totalQuantity +
                    '</td><td data-title="Available Quantity">' +
                    n[i].itemStorageLocation.availableQuantity +
                    '</td><td data-title="Expires On">' +
                    formatDate(n[i].itemStorageLocation.expiryDate) +
                    "</td></tr>";
            else {
                let r = n[i].item.name.replace(/\s/g, "");
                t +=
                    '<tr style="color: red;" id="' +
                    r +
                    '" data-itemID="' +
                    n[i].item.itemID +
                    '"><td data-title="Name">' +
                    n[i].item.name +
                    '</td><td data-title="Batch No"></td><td data-title="Unit Cost"></td><td data-title="Unit Price"></td><td data-title="Total Quantity"></td><td data-title="Available Quantity"></td><td data-title="Expires On"></td></tr>';
            }
        }
        productTable.rows.add($(t)).draw(!1);
    }
}
function SyncItems() {
    var n = Ladda.create(document.querySelector("#btnSyncInvItems"));
    n.start();
    n.isLoading();
    n.setProgress(-1);
    var t = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("GET", "/Inventory/SyncInventoryItems/", "", t)
        .then((t) => {
            n.stop(), Notify(!0, t);
        })
        .catch((t) => {
            n.stop(), Notify(!1, t);
        });
}
function DiagnoseInventory() {
    var n = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("GET", "/Inventory/DiagnoseInventory/", "", n)
        .then(() => {
            Notify(!0, "Diagnosis Complete.");
        })
        .catch((n) => {
            Notify(!1, n);
        });
}
function LoadAllInventorySubAccounts() {
    AjaxServerCallAsync("GET", "/Accounts/GetInventorySubAccounts/", "", "", function (n) {
        var i = n.response,
            r,
            t;
        if (n.status && !$.isEmptyObject(i))
            for (r = $("#CompanyBranchItem_AssetSubAccountID"), r.empty(), r.append("<option></option>"), t = 0; t < i.length; t++) {
                let n = new Option(i[t].name, i[t].subAccountID);
                r.append(n);
            }
    });
}
function LoadAllCostOfSaleSubAccounts() {
    AjaxServerCallAsync("GET", "/Accounts/GetCostOfSalesSubAccounts/", "", "", function (n) {
        var i = n.response,
            r,
            t;
        if (n.status && !$.isEmptyObject(i))
            for (r = $("#CompanyBranchItem_CostOfSaleSubAccountID"), r.empty(), r.append("<option></option>"), t = 0; t < i.length; t++) {
                let n = new Option(i[t].name, i[t].subAccountID);
                r.append(n);
            }
    });
}
function LoadAllRevenueSubAccounts() {
    AjaxServerCallAsync("GET", "/Accounts/GetIncomeSubAccounts/", "", "", function (n) {
        var i = n.response,
            r,
            t;
        if (n.status && !$.isEmptyObject(i))
            for (r = $("#CompanyBranchItem_RevenueSubAccountID"), r.empty(), r.append("<option></option>"), t = 0; t < i.length; t++) {
                let n = new Option(i[t].name, i[t].subAccountID);
                r.append(n);
            }
    });
}
function LoadAllVatTypes() {
    AjaxServerCallAsync("GET", "/Accounts/GetAllVATTypes/", "", "", function (n) {
        var i = n.response,
            r,
            t;
        if (n.status && !$.isEmptyObject(i))
            for (r = $("#CompanyBranchItem_VATTypeID"), r.empty(), r.append("<option></option>"), t = 0; t < i.length; t++) {
                let n = new Option(i[t].name, i[t].vatTypeID);
                r.append(n);
            }
    });
}
function LoadAllOtherTaxes() {
    var n = $("#CompanyBranchItem_OtherTaxID");
    n.empty();
    n.append('<option value="0"></option>');
    AjaxServerCallAsync("GET", "/Accounts/GetAllOtherTaxes/", "", "", function (t) {
        var r = t.response,
            i;
        if (t.status && !$.isEmptyObject(r))
            for (i = 0; i < r.length; i++) {
                let t = new Option(r[i].name, r[i].otherTaxID);
                n.append(t);
            }
    });
}
function LoadAllStorageLocations() {
    var n = $("#ItemStorageLocation_StorageLocationID"),
        t = Number(n.val()) || 0;
    n.empty();
    n.append("<option></option>");
    AjaxServerCallAsync("GET", "/Configurations/GetAllStorageLocations/", "", "", function (i) {
        var u = i.response,
            r;
        if (i.status && !$.isEmptyObject(u))
            for (r = 0; r < u.length; r++) {
                let i = t === u[r].storageLocationID ? new Option(u[r].name, u[r].storageLocationID, !0, !0) : new Option(u[r].name, u[r].storageLocationID);
                n.append(i);
            }
    });
}
function LoadAllUnitOfMeasures() {
    AjaxServerCallAsync("GET", "/Inventory/GetAllUnitOfMeasures/", "", "", function (n) {
        var i = n.response,
            r,
            t;
        if (n.status && !$.isEmptyObject(i))
            for (r = $("#Item_UnitOfMeasureID"), r.empty(), r.append("<option></option>"), t = 0; t < i.length; t++) {
                let n = new Option(i[t].name, i[t].unitOfMeasureID);
                r.append(n);
            }
    });
}
function FilterProducts() {
    var i = $("#ItemStorageLocation_StorageLocationID").val(),
        t,
        n;
    if (i <= 0) {
        Notify(!1, "First select the storage location");
        return;
    }
    t = $("#flag");
    n = Ladda.create(document.querySelector("#btnfilterproducts"));
    n.start();
    n.isLoading();
    n.setProgress(-1);
    t.prop("disabled", !0);
    var r = { StorageLocationID: i, FilterFlag: $("#flag").val() },
        u = $("#FilterForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Inventory/FilterProducts/", r, u)
        .then((i) => {
            LoadProducts(i), t.prop("disabled", !1), n.stop();
        })
        .catch((i) => {
            t.prop("disabled", !1), n.stop(), Notify(!1, i);
        });
}
function GetProducts(n, t = 1) {
    var i = $("#ItemStorageLocation_StorageLocationID").val();
    if (i <= 0) Notify(!1, "First select the storage location"), n || l.stop();
    else {
        var r = { StorageLocationID: i, SearchIndex: $("#searchIndex").val(), All: n, IsActive: t },
            u = $("#SearchProductForm input[name=__RequestVerificationToken]").val();
        GetOrPostAsync("POST", "/Inventory/SearchProducts/", r, u)
            .then((t) => {
                LoadProducts(t), n || l.stop();
            })
            .catch((n) => Notify(!1, n));
    }
}
function LoadProducts(n) {
    if ((productTable.clear().draw(), $.isEmptyObject(n))) Inform("No products found!!");
    else if (0) {
        let t = 0,
            i = 0;
        try {
            i = n[0].companyBranchItem.companyBranchItemID;
        } catch (t) {
            i = 0;
        }
        try {
            t = n[0].itemStorageLocation.itemStorageLocationID;
        } catch (t) {
            t = 0;
        }
        if (t > 0) GetInventoryItemDetails(t);
        else if (i === 0) {
            let t = "",
                i = n[0].item.name
                    .replace(/[^\w ]/, "")
                    .replace(/\s/g, "")
                    .replace(/`/g, "")
                    .replace(/'/g, "")
                    .replace(/"/g, "");
            t +=
                '<tr style="color: red;" id="' +
                i +
                '" data-branchItemID="0" data-itemID="' +
                n[0].item.itemID +
                '"><td data-title="Name">' +
                n[0].item.name +
                '</td><td data-title="Batch No"></td><td data-title="Unit Cost"></td><td data-title="Unit Price"></td><td data-title="Total Quantity"></td><td data-title="Available Quantity"></td><td data-title="Expires On"></td></tr>';
            productTable.rows.add($(t)).draw(!1);
            goToByScroll("scrolltohere");
        } else {
            let t = "",
                r = n[0].item.name
                    .replace(/[^\w ]/, "")
                    .replace(/\s/g, "")
                    .replace(/`/g, "")
                    .replace(/'/g, "")
                    .replace(/"/g, "");
            t +=
                '<tr style="color: #FFBF00;" id="' +
                r +
                '" data-branchItemID="' +
                i +
                '" data-itemID="' +
                n[0].item.itemID +
                '"><td data-title="Name">' +
                n[0].item.name +
                '</td><td data-title="Batch No"></td><td data-title="Unit Cost"></td><td data-title="Unit Price"></td><td data-title="Total Quantity"></td><td data-title="Available Quantity"></td><td data-title="Expires On"></td></tr>';
            productTable.rows.add($(t)).draw(!1);
            goToByScroll("scrolltohere");
            Notify(!1, "Create opening stock for the item first");
        }
    } else {
        let t = "";
        for (let i = 0; i < n.length; i++) {
            let u = 0,
                r = 0;
            if ((n[i].companyBranchItem !== null && (r = n[i].companyBranchItem.companyBranchItemID), n[i].itemStorageLocation !== null && (u = n[i].itemStorageLocation.itemStorageLocationID), u > 0))
                t +=
                    '<tr style="color: green;" data-branchItemID="' +
                    r +
                    '" data-itemID="' +
                    n[i].item.itemID +
                    '" id="' +
                    u +
                    '"><td data-title="Name">' +
                    n[i].item.name +
                    '</td><td data-title="Batch No">' +
                    n[i].itemStorageLocation.batch +
                    '</td><td data-title="Unit Cost" class="currency">' +
                    formatCurrency(n[i].itemStorageLocation.unitCost) +
                    '</td><td data-title="Unit Price" class="currency">' +
                    formatCurrency(n[i].unitPrice) +
                    '</td><td data-title="Total Quantity">' +
                    n[i].itemStorageLocation.totalQuantity +
                    '</td><td data-title="Available Quantity">' +
                    n[i].itemStorageLocation.availableQuantity +
                    '</td><td data-title="Expires On">' +
                    formatDate(n[i].itemStorageLocation.expiryDate) +
                    "</td></tr>";
            else if (r === 0) {
                let r = n[i].item.name
                    .replace(/[^\w ]/, "")
                    .replace(/\s/g, "")
                    .replace(/`/g, "")
                    .replace(/'/g, "")
                    .replace(/"/g, "");
                t +=
                    '<tr style="color: red;" id="' +
                    r +
                    '" data-branchItemID="0" data-itemID="' +
                    n[i].item.itemID +
                    '"><td data-title="Name">' +
                    n[i].item.name +
                    '</td><td data-title="Batch No"></td><td data-title="Unit Cost"></td><td data-title="Unit Price"></td><td data-title="Total Quantity"></td><td data-title="Available Quantity"></td><td data-title="Expires On"></td></tr>';
            } else {
                let u = n[i].item.name
                    .replace(/[^\w ]/, "")
                    .replace(/\s/g, "")
                    .replace(/`/g, "")
                    .replace(/'/g, "")
                    .replace(/"/g, "");
                t +=
                    '<tr style="color: #FFBF00;" id="' +
                    u +
                    '" data-branchItemID="' +
                    r +
                    '" data-itemID="' +
                    n[i].item.itemID +
                    '"><td data-title="Name">' +
                    n[i].item.name +
                    '</td><td data-title="Batch No"></td><td data-title="Unit Cost"></td><td data-title="Unit Price"></td><td data-title="Total Quantity"></td><td data-title="Available Quantity"></td><td data-title="Expires On"></td></tr>';
            }
        }
        productTable.rows.add($(t)).draw(!1);
        goToByScroll("scrolltohere");
    }
}
function order_by_occurrence(n) {
    var t = {};
    return (
        n.forEach(function (n) {
            t[n] || (t[n] = 0);
            t[n]++;
        }),
        Object.keys(t).sort(function (n, i) {
            return t[n] < t[i];
        })
    );
}
function DeactivateItem(n) {
    var t = n,
        i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Inventory/DeactivateItem/", t, i)
        .then(() => {
            Notify(!0, "Item Deactivated Successfully.");
        })
        .catch((n) => {
            Notify(!1, n);
        });
}
function ActivateItem(n) {
    var t = n,
        i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Inventory/ActivateItem/", t, i)
        .then(() => {
            Notify(!0, "Item Activated Successfully.");
        })
        .catch((n) => {
            Notify(!1, n);
        });
}
function updateDataTableSelectAllCtrl(n) {
    var i = n.table().node(),
        u = $('tbody input[type="checkbox"]', i),
        r = $('tbody input[type="checkbox"]:checked', i),
        t = $('thead input[name="select_all"]', i).get(0);
    r.length === 0
        ? ((t.checked = !1), "indeterminate" in t && ($(".selectAll").prop("indeterminate", !1), $(".selectAll").prop("checked", !1)))
        : r.length === u.length
        ? ((t.checked = !0), "indeterminate" in t && ($(".selectAll").prop("indeterminate", !1), $(".selectAll").prop("checked", !0)))
        : ((t.checked = !0), "indeterminate" in t && $(".selectAll").prop("indeterminate", !0));
}
function ReservedItems(n = true) {
    var r = Number($("#ItemStorageLocation_ItemStorageLocationID").val() || 0),
        u = $("#InventoryItemForm input[name=__RequestVerificationToken]").val(),
        t,
        i;
    r <= 0
        ? ((t = { StorageLocationID: $("#ItemStorageLocation_StorageLocationID").val(), Status: $("#ReserveStatus").val() }), (i = "/Inventory/GetReservedOrderItemsByStorageLocation/"))
        : ((t = { ItemStorageLocationID: r, Status: $("#ReserveStatus").val() }), (i = "/Inventory/GetReservedOrderItems/"));
    GetOrPostAsync("POST", i, t, u)
        .then((t) => {
            if ((reservedTable.clear().draw(), !$.isEmptyObject(t))) {
                var i = "";
                for (let n = 0; n < t.length; n++)
                    i +=
                        '<tr data-status="' +
                        t[n].saleStatus +
                        '" style="color: ' +
                        t[n].color +
                        ';" id="' +
                        t[n].customerBillItemID +
                        '"><td class="dt-body-center"><input type="checkbox" id="' +
                        t[n].customerBillItemID +
                        '"/></td><td data-title="Order #">' +
                        t[n].customerBillID +
                        '</td><td data-title="Item">' +
                        t[n].item +
                        '</td><td data-title="Customer">' +
                        t[n].customer +
                        '</td><td data-title="Timestamp">' +
                        formatDateTime(t[n].dateTimeBilled) +
                        '</td><td data-title="Quantity">' +
                        t[n].quantity +
                        '</td><td data-title="Status">' +
                        t[n].status +
                        '</td><td data-title="Net Amount" class="currency">' +
                        formatCurrency(t[n].netAmount) +
                        "</td></tr>";
                reservedTable.rows.add($(i)).draw(!1);
            }
            n && $(".reserved-items-modal").modal("toggle");
        })
        .catch((n) => {
            Notify(!1, n);
        });
}
function LoadExpiredBatches() {
    var n = $("#ItemStorageLocation_StorageLocationID").val(),
        t = $("#SearchProductForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Inventory/GetExpiredStorageLocationProducts/", n, t)
        .then((n) => {
            if ((expiredbatchesTable.clear().draw(), (selectedBatchIds = []), !$.isEmptyObject(n))) {
                let t = "";
                for (let i = 0; i < n.length; i++)
                    t +=
                        '<tr id="' +
                        n[i].itemStorageLocation.itemStorageLocationID +
                        '"><td class="dt-body-center"><input type="checkbox" id="' +
                        n[i].itemStorageLocation.itemStorageLocationID +
                        '"/></td><td data-title="Name">' +
                        n[i].item.name +
                        '</td><td data-title="Batch No">' +
                        n[i].itemStorageLocation.batch +
                        '</td><td data-title="Expires Date">' +
                        formatDate(n[i].itemStorageLocation.expiryDate) +
                        '</td><td data-title="Cost" class="currency">' +
                        formatCurrency(n[i].itemStorageLocation.unitCost) +
                        '</td><td data-title="Available Quantity">' +
                        n[i].itemStorageLocation.availableQuantity +
                        '</td><td data-title="Total Quantity">' +
                        n[i].itemStorageLocation.totalQuantity +
                        "</td></tr>";
                expiredbatchesTable.rows.add($(t)).draw(!1);
            }
        })
        .catch((n) => Notify(!1, n));
}
function updateDataTableSelectAllCtrl2(n) {
    var i = n.table().node(),
        u = $('tbody input[type="checkbox"]', i),
        r = $('tbody input[type="checkbox"]:checked', i),
        t = $('thead input[name="select_all_e"]', i).get(0);
    r.length === 0
        ? ((t.checked = !1), "indeterminate" in t && ($(".selectAllE").prop("indeterminate", !1), $(".selectAllE").prop("checked", !1)))
        : r.length === u.length
        ? ((t.checked = !0), "indeterminate" in t && ($(".selectAllE").prop("indeterminate", !1), $(".selectAllE").prop("checked", !0)))
        : ((t.checked = !0), "indeterminate" in t && $(".selectAllE").prop("indeterminate", !0));
}
var selectedids, selectedBatchIds;
$(document).ready(function () {
    productTable.clear().draw();
    reservedTable.clear().draw();
    expiredbatchesTable.clear().draw();
    $("#itemcategoriestable tbody").empty();
    ReloadPage();
    $("#Item_ItemID").val("0");
    $("#ItemStorageLocation_ItemStorageLocationID").val("0");
    $("#ItemStorageLocation_CompanyBranchItemID").val("0");
    $("#CompanyBranchItem_CompanyBranchItemID").val("0");
    $("#PreviousUnitCost").val("0");
    $("#PreviousQuantity").val("0");
    $("#ItemStorageLocation_AvailableQuantity").val("0");
    $("#PreviousUnitPrice").val("0");
    $(".select-stoloc-modal").modal("toggle");
    $("#ItemCategory_ItemCategoryID").val("0");
    $("#ItemClass_ItemClassID").val("0");
});
const productTable = $("#inventoryitemstable").DataTable({
    drawCallback: function () {
        $.contextMenu("destroy", `#${$(this).prop("id")} tbody tr td`);
        $.contextMenu({
            selector: "#inventoryitemstable tbody tr td",
            trigger: "right",
            delay: 500,
            autoHide: !0,
            callback: function (n, t) {
                var i = t.$trigger[0].parentElement.id,
                    u = Number($("#inventoryitemstable #" + i).data("itemid") || 0),
                    r = Number($("#inventoryitemstable #" + i).data("branchitemid") || 0);
                isNaN(i) && (i = 0);
                switch (n) {
                    case "select":
                        i > 0 ? GetInventoryItemDetails(i) : r > 0 ? Notify(!1, "First create the opening stock for this item") : Notify(!1, "This item is not in your branch. Make sure you add it first");
                        break;
                    case "delete":
                        if (i > 0) {
                            let n = confirm("Are You Sure You Want To Delete The Selected Inventory Item?");
                            n === !0 && DeleteInventoryItem(i);
                        } else Notify(!1, "Can only delete stock item(s) already in the selected storage location");
                        break;
                    case "openstock":
                        if (u > 0 && r > 0) {
                            let n = confirm("Are You Sure You Want To Create an opening stock for the selected item?");
                            n === !0 && CreateOpeningStock(u, r);
                        } else r > 0 && Notify(!1, "Item already in stock");
                        break;
                    case "createinbranch":
                        r > 0 ? Notify(!1, "Item already exist in this branch") : GetItemDetails(u);
                        break;
                    case "retire":
                        if (i > 0) {
                            let n = confirm("You are about to retire the selected batch. Do you wish to continue?");
                            n === !0 && RetireBatch(i);
                        } else Notify(!1, "Can only retire batch that is in the selected storage location");
                        break;
                    case "deactivate":
                        Number(r) > 0 ? confirm("You are about to deactivate the selected item. Do you wish to continue?") === !0 && DeactivateItem(r) : Notify(!1, "This item is not in your branch. Make sure you add it first");
                        break;
                    case "activate":
                        Number(r) > 0 ? confirm("You are about to activate the selected item. Do you wish to continue?") === !0 && ActivateItem(r) : Notify(!1, "This item is not in your branch. Make sure you add it first");
                }
            },
            items: {
                select: { name: "Select" },
                delete: { name: "Delete" },
                openstock: { name: "Create Opening Stock" },
                createinbranch: { name: "Create Item In Branch" },
                retire: { name: "Retire Selected Batch" },
                activate: { name: "Activate" },
                deactivate: { name: "Deactivate" },
            },
        });
    },
    lengthChange: !1,
    buttons: ["excel", "csv", "pdf", "print"],
    paging: !1,
    searching: !0,
    ordering: !0,
    bInfo: !0,
    select: !0,
    scrollY: "30vh",
    sScrollX: "100%",
    scrollX: !0,
});
productTable.on("select", function (n, t, i, r) {
    if (i === "row") {
        let t = productTable.rows(r).data().toArray(),
            n = t[0].DT_RowId;
        if (n !== undefined)
            if (n > 0) GetInventoryItemDetails(n);
            else {
                let t = $("#inventoryitemstable #" + n).data("branchitemid");
                t > 0 ? Notify(!1, "First create the opening stock for this item") : Notify(!1, "This item is not in your branch. Make sure you add it first");
            }
    }
});
const categoriesTable = $("#itemcategoriestable").DataTable({
    drawCallback: function () {
        $.contextMenu("destroy", `#${$(this).prop("id")} tbody tr td`);
        $.contextMenu({
            selector: "#itemcategoriestable tbody tr td",
            trigger: "right",
            delay: 500,
            autoHide: !0,
            callback: function (n, t) {
                var i = t.$trigger[0].parentElement.id,
                    r;
                switch (n) {
                    case "select":
                        GetItemCategoryDetails(i);
                        break;
                    case "delete":
                        r = confirm("Are You Sure You Want To Delete The Selected Item Category?");
                        r === !0 && DeleteItemCategory(i);
                }
            },
            items: { select: { name: "Select" }, delete: { name: "Delete" } },
        });
    },
    lengthChange: !1,
    buttons: ["excel", "csv", "pdf", "print"],
    paging: !1,
    searching: !1,
    ordering: !1,
    bInfo: !1,
    select: !0,
    scrollY: "40vh",
    sScrollX: "100%",
    scrollX: !0,
});
categoriesTable.on("select", function (n, t, i, r) {
    if (i === "row") {
        let t = categoriesTable.rows(r).data().toArray(),
            n = t[0].DT_RowId;
        n !== undefined && GetItemCategoryDetails(n);
    }
});
const reservedTable = $("#reservedtable").DataTable({ lengthChange: !1, buttons: ["excel", "csv", "pdf", "print"], paging: !1, searching: !0, ordering: !0, bInfo: !0, scrollY: "60vh", sScrollX: "100%", scrollX: !0 }),
    expiredbatchesTable = $("#expiredbatchestable").DataTable({ lengthChange: !1, paging: !1, searching: !0, ordering: !0, bInfo: !0, scrollY: "58vh", sScrollX: "100%", scrollX: !0, order: [1, "asc"] }),
    classesTable = $("#itemclassestable").DataTable({
        drawCallback: function () {
            $.contextMenu("destroy", `#${$(this).prop("id")} tbody tr td`);
            $.contextMenu({
                selector: "#itemclassestable tbody tr td",
                trigger: "right",
                delay: 500,
                autoHide: !0,
                callback: function (n, t) {
                    var i = t.$trigger[0].parentElement.id,
                        r;
                    switch (n) {
                        case "select":
                            GetItemClassDetails(i);
                            break;
                        case "delete":
                            r = confirm("Are You Sure You Want To Delete The Selected Item Class?");
                            r === !0 && DeleteItemClass(i);
                    }
                },
                items: { select: { name: "Select" }, delete: { name: "Delete" } },
            });
        },
        lengthChange: !1,
        buttons: ["excel", "csv", "pdf", "print"],
        paging: !1,
        searching: !1,
        ordering: !1,
        bInfo: !1,
        select: !0,
        scrollY: "40vh",
        sScrollX: "100%",
        scrollX: !0,
    });
classesTable.on("select", function (n, t, i, r) {
    if (i === "row") {
        let t = classesTable.rows(r).data().toArray(),
            n = t[0].DT_RowId;
        n !== undefined && GetItemClassDetails(n);
    }
});
$(document).ready(function () {
    productTable.buttons().container().appendTo("#inventoryitemstable_wrapper .col-sm-6:eq(0)");
    categoriesTable.buttons().container().appendTo("#itemcategoriestable_wrapper .col-sm-6:eq(0)");
    classesTable.buttons().container().appendTo("#itemclassestable_wrapper .col-sm-6:eq(0)");
    reservedTable.buttons().container().appendTo("#reservedtable_wrapper .col-sm-6:eq(0)");
});
$("#ItemCategoryForm").submit(function (n) {
    var i;
    n.preventDefault();
    i = $("#ItemCategory_ItemCategoryID").val();
    let t = Ladda.create(document.querySelector("#btnadditemcat"));
    i > 0 && (t = Ladda.create(document.querySelector("#btnupdateitemcat")));
    t.start();
    t.isLoading();
    t.setProgress(-1);
    var r = {
            ItemCategory: { ItemCategoryID: $("#ItemCategory_ItemCategoryID").val(), Name: $("#ItemCategory_Name").val(), Code: $("#ItemCategory_Code").val(), Description: $("#ItemCategory_Description").val() },
            DepartmentID: $("#ItemCategory_DepartmentID").val(),
        },
        u = $("#ItemCategoryForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Configurations/CreateUpdateItemCategory/", r, u)
        .then(() => {
            LoadAllItemCategories(), t.stop(), i > 0 ? Notify(!0, "Item Category Updated Successfully") : (Notify(!0, "Item Category Created Successfully"), $("#btnCreateNewItemCat").click());
        })
        .catch((n) => {
            t.stop(), Notify(!1, n);
        });
});
$("#btnCreateNewItemCat").click(function () {
    $("#ItemCategoryForm")[0].reset();
    $("#ItemCategory_ItemCategoryID").val("0");
    $("#updateitemcat").hide();
    $("#additemcat").show();
});
$("#ItemClassForm").submit(function (n) {
    var i;
    n.preventDefault();
    i = $("#ItemClass_ItemClassID").val();
    let t = Ladda.create(document.querySelector("#btnadditemclass"));
    i > 0 && (t = Ladda.create(document.querySelector("#btnupdateitemclass")));
    t.start();
    t.isLoading();
    t.setProgress(-1);
    var r = { ItemClassID: $("#ItemClass_ItemClassID").val(), Name: $("#ItemClass_Name").val(), Description: $("#ItemClass_Description").val(), ItemClassType: $("#ItemClass_ItemClassType").val() },
        u = $("#ItemClassForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Configurations/CreateUpdateItemClass/", r, u)
        .then(() => {
            LoadAllItemClasses(), t.stop(), i > 0 ? Notify(!0, "Item Class Updated Successfully") : (Notify(!0, "Item Class Created Successfully"), $("#btnCreateNewItemClass").click());
        })
        .catch((n) => {
            t.stop(), Notify(!1, n);
        });
});
$("#btnCreateNewItemClass").click(function () {
    $("#ItemClassForm")[0].reset();
    $("#ItemClass_ItemClassID").val("0");
    $("#updateitemclass").hide();
    $("#additemclass").show();
});
$("#InventoryItemForm").submit(function (n) {
    var i, t, r, u;
    if (
        (n.preventDefault(),
        (i = Number($("#ItemStorageLocation_ItemStorageLocationID").val())),
        (t = Ladda.create(document.querySelector("#btnaddproduct"))),
        i > 0 && (t = Ladda.create(document.querySelector("#btnupdateproduct"))),
        t.start(),
        t.isLoading(),
        t.setProgress(-1),
        (r = $("#IsNewBatch").is(":checked")),
        r && i > 0 && ((u = confirm("You are about to create a new batch from this Item. Are you sure you want to continue?")), u === !1))
    ) {
        t.stop();
        return;
    }
    var f = {
            ItemStorageLocation: {
                ItemStorageLocationID: $("#ItemStorageLocation_ItemStorageLocationID").val(),
                CompanyBranchItemID: $("#ItemStorageLocation_CompanyBranchItemID").val(),
                StorageLocationID: $("#ItemStorageLocation_StorageLocationID").val(),
                UnitCost: $("#ItemStorageLocation_UnitCost").val(),
                Batch: $("#ItemStorageLocation_Batch").val(),
                ExpiryDate: $("#ItemStorageLocation_ExpiryDate").val(),
                AvailableQuantity: $("#ItemStorageLocation_AvailableQuantity").val(),
                TotalQuantity: $("#ItemStorageLocation_TotalQuantity").val(),
                ReorderLevel: $("#ItemStorageLocation_ReorderLevel").val(),
            },
            Item: {
                ItemID: $("#Item_ItemID").val(),
                Type: $("#Item_Type").val(),
                Name: $("#Item_Name").val(),
                ItemCategoryID: $("#Item_ItemCategoryID").val(),
                ItemClassID: $("#Item_ItemClassID").val(),
                UnitOfMeasureID: $("#Item_UnitOfMeasureID").val(),
            },
            CompanyBranchItem: {
                CompanyBranchItemID: $("#CompanyBranchItem_CompanyBranchItemID").val(),
                AssetSubAccountID: $("#CompanyBranchItem_AssetSubAccountID").val(),
                CostOfSaleSubAccountID: $("#CompanyBranchItem_CostOfSaleSubAccountID").val(),
                RevenueSubAccountID: $("#CompanyBranchItem_RevenueSubAccountID").val(),
                VATTypeID: $("#CompanyBranchItem_VATTypeID").val(),
                OtherTaxID: $("#CompanyBranchItem_OtherTaxID").val(),
                ItemCode: $("#CompanyBranchItem_ItemCode").val(),
                Barcode: $("#CompanyBranchItem_Barcode").val(),
            },
            UnitPrice: $("#UnitPrice").val(),
            PreviousUnitCost: $("#PreviousUnitCost").val(),
            PreviousQuantity: $("#PreviousQuantity").val(),
            PreviousUnitPrice: $("#PreviousUnitPrice").val(),
            IsNewBatch: r ? 1 : 0,
        },
        e = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Inventory/CreateUpdateProduct/", f, e)
        .then((n) => {
            if ((t.stop(), i > 0)) {
                r ? Notify(!0, "New Batch Created Successfully") : Notify(!0, "Product Updated Successfully");
                let t = [n.item.name, n.itemStorageLocation.batch, n.itemStorageLocation.unitCost, n.unitPrice, n.itemStorageLocation.totalQuantity, n.itemStorageLocation.availableQuantity, formatDate(n.itemStorageLocation.expiryDate)];
                t.DT_RowId = n.itemStorageLocation.itemStorageLocationID;
                productTable.row(`#${i}`).data(t).draw();
            } else {
                Notify(!0, "Product Created Successfully");
                $("#btnCreateNewProduct").click();
                let t =
                    '<tr style="color: green;" data-branchItemID="' +
                    n.companyBranchItem.companyBranchItemID +
                    '" data-itemID="' +
                    n.item.itemID +
                    '" id="' +
                    n.itemStorageLocation.itemStorageLocationID +
                    '"><td data-title="Name">' +
                    n.item.name +
                    '</td><td data-title="Batch No">' +
                    n.itemStorageLocation.batch +
                    '</td><td data-title="Unit Cost">' +
                    n.itemStorageLocation.unitCost +
                    '</td><td data-title="Unit Price">' +
                    n.unitPrice +
                    '</td><td data-title="Total Quantity">' +
                    n.itemStorageLocation.totalQuantity +
                    '</td><td data-title="Available Quantity">' +
                    n.itemStorageLocation.availableQuantity +
                    '</td><td data-title="Expires On">' +
                    formatDate(n.itemStorageLocation.expiryDate) +
                    "</td></tr>";
                productTable.row.add($(t)).draw();
            }
        })
        .catch((n) => {
            t.stop(), Notify(!1, n);
        });
});
$(document).scannerDetection({
    timeBeforeScanTest: 200,
    avgTimeByChar: 40,
    preventDefault: !1,
    endChar: [13],
    onComplete: function (n) {
        let t = $("#CompanyBranchItem_Barcode");
        t.is(":focus") ? (t.val(n), Number($("#ItemStorageLocation_ItemStorageLocationID").val()) > 0 && $("#InventoryItemForm").submit()) : ($("#searchIndex").val(n), $("#SearchProductForm").submit());
    },
    onError: function () {},
});
$("#ItemStorageLocation_StorageLocationID").on("change", function () {
    $("#inventoryitemstable tbody").empty();
    var i = $.trim($("#searchIndex").val()),
        t = $("#ItemStorageLocation_StorageLocationID").val(),
        n = $(".stolocchosen");
    if (t > 0) {
        var r = t,
            u = $("#SearchProductForm input[name=__RequestVerificationToken]").val();
        GetOrPostAsync("POST", "/Inventory/CanAccessStorageLocation/", r, u)
            .then(() => {
                i.length > 0 && $("#SearchProductForm").trigger("submit"),
                    n.html($("#ItemStorageLocation_StorageLocationID option:selected").text() + "&nbsp; / &nbsp; "),
                    n.show(),
                    $(".select-stoloc-modal").modal("toggle"),
                    $("#searchIndex").focus();
            })
            .catch((n) => {
                $("#ItemStorageLocation_StorageLocationID").val("0"), Notify(!1, n);
            });
    } else n.hide();
});
$("#changeStoloc").on("click", function () {
    $(".select-stoloc-modal").modal("toggle");
});
$(document).ready(function () {
    $("#btnCreateNewProduct").click(function () {
        $("#InventoryItemForm")[0].reset();
        $("#Item_ItemID").val("0");
        $("#ItemStorageLocation_ItemStorageLocationID").val("0");
        $("#ItemStorageLocation_CompanyBranchItemID").val("0");
        $("#CompanyBranchItem_CompanyBranchItemID").val("0");
        $("#PreviousUnitCost").val("0");
        $("#PreviousQuantity").val("0");
        $("#ItemStorageLocation_AvailableQuantity").val("0");
        $("#PreviousUnitPrice").val("0");
        $("#updateproduct").hide();
        $("#addproduct").show();
    });
});
$("#btnCreateopeningstock").on("click", function () {
    $("#CreateOpeningStockForm")[0].reset();
    $("#CreateOpeningStockFor").trigger("change");
    $("#OpenStockItemCategoryIds").select2();
    var n = $("#ItemStorageLocation_StorageLocationID option:selected").text();
    $("#txtCOSStorageLoc").text(n);
    $(".create-opening-stock-modal").modal("toggle");
});
$("#CreateOpeningStockFor").on("change", function () {
    let n = Number($(this).val());
    n === 1 ? ($("#divOSCategory").hide(), $("#OpenStockItemCategoryIds").prop("required", !1)) : ($("#divOSCategory").show(), $("#OpenStockItemCategoryIds").prop("required", !0));
});
$("#CreateOpeningStockForm").submit(function (n) {
    n.preventDefault();
    let t = Number($("#CreateOpeningStockFor").val()) === 1;
    t ? CreateOpeningStockAllItems($("#ItemStorageLocation_StorageLocationID").val()) : CreateOpeningStockSelectedCategories($("#ItemStorageLocation_StorageLocationID").val());
});
$(document).ready(function () {
    $("#btnSyncInvItems").click(function () {
        SyncItems();
    });
});
$("#SearchProductForm").submit(function (n) {
    var t, i;
    if ((n.preventDefault(), (t = Ladda.create(document.querySelector("#btnsearchitem"))), t.start(), t.isLoading(), t.setProgress(-1), (i = $("#ItemStorageLocation_StorageLocationID").val()), i <= 0))
        Notify(!1, "First select the storage location"), t.stop();
    else {
        var r = { StorageLocationID: i, SearchIndex: $("#searchIndex").val() },
            u = $("#SearchProductForm input[name=__RequestVerificationToken]").val();
        GetOrPostAsync("POST", "/Inventory/SearchProducts/", r, u)
            .then((n) => {
                t.stop(), LoadProducts(n), $("#searchIndex").val(""), $("#searchIndex").focus();
            })
            .catch((n) => {
                t.stop(), Notify(!1, n);
            });
    }
});
$("#FilterForm").submit(function (n) {
    n.preventDefault();
    FilterProducts();
});
$("#flag").on("change", FilterProducts);
$("#ImportProductsForm").submit(function (n) {
    var t, r, u, f;
    if ((n.preventDefault(), (t = Ladda.create(document.querySelector("#btnImportCsv"))), t.start(), t.isLoading(), t.setProgress(-1), (r = $("#ItemStorageLocation_StorageLocationID").val()), r <= 0))
        Notify(!1, "First select the storage location to import to"), t.stop();
    else if (((u = $("#ImportProductsForm input[name=__RequestVerificationToken]").val()), (f = "/Inventory/ImportProducts/"), window.FormData !== undefined)) {
        var i = new FormData(),
            e = document.getElementById("csvFile").files[0];
        i.append(e.name, e);
        i.append("StorageLocationID", r);
        i.append("isStockTake", 0);
        $.ajax({
            url: f,
            type: "POST",
            contentType: !1,
            processData: !1,
            data: i,
            headers: { RequestVerificationToken: u },
            success: function (n) {
                if ((t.stop(), n.failedExist))
                    var i = new Noty({
                        text: n.message,
                        type: "info",
                        theme: "metroui ",
                        closeWith: ["click", "button"],
                        buttons: [
                            Noty.button("Download Failed Imports", "btn btn-warning btn-xs", function () {
                                window.location.href = "/Inventory/DownloadFailedProductImports";
                                i.close();
                            }),
                        ],
                    }).show();
                else Notify(!0, n.message);
            },
            error: function (n) {
                Notify(!1, n.responseText);
                t.stop();
            },
        });
    } else Notify(!1, "FormData is not supported.");
});
$(document).ready(function () {
    $("#btnExportProducts").click(function () {
        var n = Ladda.create(document.querySelector("#btnExportProducts")),
            t,
            i;
        n.start();
        n.isLoading();
        n.setProgress(-1);
        t = $("#ItemStorageLocation_StorageLocationID").val();
        t <= 0
            ? (Notify(!1, "First select the storage location"), n.stop())
            : ((i = t),
              (window.location.href = "/Inventory/ExportInventoryItems/?storageLocationID=" + t),
              Inform("Exporting stock, for update, through the 'Inventory' panel was disabled. Please use the 'Stock Take' panel instead."),
              n.stop());
    });
});
var last_result = [],
    resultCollector = Quagga.ResultCollector.create({
        capture: !0,
        capacity: 20,
        blacklist: [
            { code: "WIWV8ETQZ1", format: "code_93" },
            { code: "EH3C-%GU23RK3", format: "code_93" },
            { code: "O308SIHQOXN5SA/PJ", format: "code_93" },
            { code: "DG7Q$TV8JQ/EN", format: "code_93" },
            { code: "VOFD1DB5A.1F6QU", format: "code_93" },
            { code: "4SO64P4X8 U4YUU1T-", format: "code_93" },
        ],
        filter: function () {
            return !0;
        },
    }),
    App = {
        init: function () {
            var n = this;
            Quagga.init(this.state, function (t) {
                if (t) return n.handleError(t);
                App.attachListeners();
                App.checkCapabilities();
                Quagga.start();
            });
        },
        handleError: function (n) {
            console.log(n);
        },
        checkCapabilities: function () {
            var t = Quagga.CameraAccess.getActiveTrack(),
                n = {};
            typeof t.getCapabilities == "function" && (n = t.getCapabilities());
            this.applySettingsVisibility("zoom", n.zoom);
            this.applySettingsVisibility("torch", n.torch);
        },
        updateOptionsForMediaRange: function (n, t) {
            var u, e, i, f, r;
            for (console.log("updateOptionsForMediaRange", n, t), u = 6, e = (t.max - t.min) / u; n.firstChild; ) n.removeChild(n.firstChild);
            for (r = 0; r <= u; r++) (f = t.min + e * r), (i = document.createElement("option")), (i.value = f), (i.innerHTML = f), n.appendChild(i);
        },
        applySettingsVisibility: function (n, t) {
            if (typeof t == "boolean") {
                let i = document.querySelector('input[name="settings_' + n + '"]');
                i && (i.parentNode.style.display = t ? "block" : "none");
                return;
            }
            if (window.MediaSettingsRange && t instanceof window.MediaSettingsRange) {
                let i = document.querySelector('select[name="settings_' + n + '"]');
                i && (this.updateOptionsForMediaRange(i, t), (i.parentNode.style.display = "block"));
                return;
            }
        },
        initCameraSelection: function () {
            var n = Quagga.CameraAccess.getActiveStreamLabel();
            return Quagga.CameraAccess.enumerateVideoDevices().then(function (t) {
                function r(n) {
                    return n.length > 30 ? n.substr(0, 30) : n;
                }
                for (var i = document.getElementById("deviceSelection"); i.firstChild; ) i.removeChild(i.firstChild);
                t.forEach(function (t) {
                    var u = document.createElement("option");
                    u.value = t.deviceId || t.id;
                    u.appendChild(document.createTextNode(r(t.label || t.deviceId || t.id)));
                    u.selected = n === t.label;
                    i.appendChild(u);
                });
            });
        },
        attachListeners: function () {
            var n = this;
            n.initCameraSelection();
            $(".stop").on("click", function (n) {
                n.preventDefault();
                Quagga.stop();
            });
            $(".controls .reader-config-group").on("change", "input, select", function (t) {
                t.preventDefault();
                var i = $(t.target),
                    r = i.attr("type") === "checkbox" ? i.prop("checked") : i.val(),
                    u = i.attr("name"),
                    f = n._convertNameToState(u);
                n.setState(f, r);
            });
        },
        _printCollectedResults: function () {
            var n = resultCollector.getResults(),
                t = $("#result_strip ul.collector");
            n.forEach(function (n) {
                var i = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
                i.find("img").attr("src", n.frame);
                i.find("h4.code").html(n.codeResult.code + " (" + n.codeResult.format + ")");
                t.prepend(i);
            });
        },
        _accessByPath: function (n, t, i) {
            var r = t.split("."),
                u = r.length,
                f = typeof i != "undefined" ? !0 : !1;
            return r.reduce(function (n, t, r) {
                return f && r + 1 === u && (typeof n[t] == "object" && typeof i == "object" ? Object.assign(n[t], i) : (n[t] = i)), t in n ? n[t] : {};
            }, n);
        },
        _convertNameToState: function (n) {
            return n
                .replace("_", ".")
                .split("-")
                .reduce(function (n, t) {
                    return n + t.charAt(0).toUpperCase() + t.substring(1);
                });
        },
        detachListeners: function () {
            $(".controls").off("click", "button.stop");
            $(".controls .reader-config-group").off("change", "input, select");
        },
        applySetting: function (n, t) {
            var i = Quagga.CameraAccess.getActiveTrack();
            if (i && typeof i.getCapabilities == "function")
                switch (n) {
                    case "zoom":
                        return i.applyConstraints({ advanced: [{ zoom: parseFloat(t) }] });
                    case "torch":
                        return i.applyConstraints({ advanced: [{ torch: !!t }] });
                }
        },
        setState: function (n, t) {
            var i = this,
                r;
            if ((typeof i._accessByPath(i.inputMapper, n) == "function" && (t = i._accessByPath(i.inputMapper, n)(t)), n.startsWith("settings."))) return (r = n.substring(9)), i.applySetting(r, t);
            i._accessByPath(i.state, n, t);
            App.detachListeners();
            Quagga.stop();
            App.init();
        },
        inputMapper: {
            inputStream: {
                constraints: function (n) {
                    if (/^(\d+)x(\d+)$/.test(n)) {
                        var t = n.split("x");
                        return { width: { min: parseInt(t[0]) }, height: { min: parseInt(t[1]) } };
                    }
                    return { deviceId: n };
                },
            },
            numOfWorkers: function (n) {
                return parseInt(n);
            },
            decoder: {
                readers: function (n) {
                    return n === "ean_extended" ? [{ format: "ean_reader", config: { supplements: ["ean_5_reader", "ean_2_reader"] } }] : [{ format: n + "_reader", config: {} }];
                },
            },
        },
        state: {
            inputStream: { type: "LiveStream", constraints: { width: { min: 320 }, height: { min: 240 }, facingMode: "environment", aspectRatio: { min: 1, max: 100 } } },
            locator: { patchSize: "medium", halfSample: !0 },
            numOfWorkers: navigator.hardwareConcurrency,
            frequency: 10,
            decoder: { readers: [{ format: "ean_reader", config: { supplements: ["ean_5_reader", "ean_2_reader"] } }] },
            locate: !0,
        },
        lastResult: null,
    };
Quagga.onProcessed(function (n) {
    var t = Quagga.canvas.ctx.overlay,
        i = Quagga.canvas.dom.overlay;
    n &&
        (n.boxes &&
            (t.clearRect(0, 0, parseInt(i.getAttribute("width")), parseInt(i.getAttribute("height"))),
            n.boxes
                .filter(function (t) {
                    return t !== n.box;
                })
                .forEach(function (n) {
                    Quagga.ImageDebug.drawPath(n, { x: 0, y: 1 }, t, { color: "green", lineWidth: 2 });
                })),
        n.box && Quagga.ImageDebug.drawPath(n.box, { x: 0, y: 1 }, t, { color: "#00F", lineWidth: 2 }),
        n.codeResult && n.codeResult.code && Quagga.ImageDebug.drawPath(n.line, { x: "x", y: "y" }, t, { color: "red", lineWidth: 3 }));
});
Quagga.onDetected(function (n) {
    var t = n.codeResult.code;
    if (((App.lastResult = t), last_result.push(t), last_result.length > 5)) {
        let n = order_by_occurrence(last_result)[0];
        document.querySelector("input.isbn").value = n;
        last_result = [];
        App.detachListeners();
        Quagga.stop();
        $("#SearchProductForm").trigger("submit");
        $(".quagga-modal").modal("toggle");
    }
});
$("#btnScan").on("click", function () {
    App.init();
    $(".quagga-modal").modal("toggle");
});
$("#btnRetireOldBatches").on("click", () => {
    var n;
    if (confirm("You are about to retire old batches. Do you wish to continue?")) {
        n = Ladda.create(document.querySelector("#btnRetireOldBatches"));
        n.start();
        n.isLoading();
        n.setProgress(-1);
        var t = $("#ItemStorageLocation_StorageLocationID").val(),
            i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
        GetOrPostAsync("POST", "/Inventory/RetireOldBatches/", t, i)
            .then((t) => {
                n.stop(), Number(t) === 0 ? Inform("There are no batches to retire at the moment.") : Notify(!0, `${t} old batch(es) retired successfully.`);
            })
            .catch((t) => {
                n.stop(), Notify(!1, t);
            });
    }
});
$("#btnMergeBatches").on("click", () => {
    var n;
    if (confirm("You are about to merge items with more than one batches. Do you wish to continue?")) {
        n = Ladda.create(document.querySelector("#btnRetireOldBatches"));
        n.start();
        n.isLoading();
        n.setProgress(-1);
        var t = $("#ItemStorageLocation_StorageLocationID").val(),
            i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
        GetOrPostAsync("POST", "/Inventory/MergeBatches/", t, i)
            .then((t) => {
                n.stop(), Notify(!0, t);
            })
            .catch((t) => {
                n.stop(), Notify(!1, t);
            });
    }
});
selectedids = [];
$("#reservedtable tbody").on("click", 'input[type="checkbox"]', function (n) {
    var i = $(this).closest("tr"),
        t;
    selectedids = [];
    t = -1;
    $("#reservedtable input[type=checkbox]:checked").each(function () {
        let n = Number($(this).closest("tr").attr("id")),
            i = Number($(this).closest("tr").data("status"));
        if ((t === -1 && (t = i), i !== t)) return $(this).prop("checked", !1), !0;
        isNaN(n) || selectedids.push(n);
    });
    this.checked ? i.addClass("selected") : i.removeClass("selected");
    updateDataTableSelectAllCtrl(reservedTable);
    n.stopPropagation();
});
$('thead input[name="select_all"]', reservedTable.table().container()).on("click", function (n) {
    this.checked ? $('#reservedtable tbody input[type="checkbox"]:not(:checked)').trigger("click") : $('#reservedtable tbody input[type="checkbox"]:checked').trigger("click");
    n.stopPropagation();
});
reservedTable.on("draw", function () {
    updateDataTableSelectAllCtrl(reservedTable);
});
$("#btnViewReservedItems").on("click", () => ReservedItems());
$("#ReserveStatus").on("change", () => {
    ReservedItems(!1);
});
$("#btnDispenseSelected").on("click", function () {
    var n = Ladda.create(document.querySelector("#btnDispenseSelected"));
    n.start();
    n.isLoading();
    n.setProgress(-1);
    var t = { StorageLocationID: $("#ItemStorageLocation_StorageLocationID").val(), SelectedItemIds: selectedids },
        i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Inventory/DispenseReservedItems/", t, i)
        .then((t) => {
            n.stop(), Notify(!0, t), (selectedids = []), ReservedItems(!1);
        })
        .catch((t) => {
            n.stop(), Notify(!1, t);
        });
});
$("#btnVoidSelected").on("click", function () {
    var n = Ladda.create(document.querySelector("#btnVoidSelected"));
    n.start();
    n.isLoading();
    n.setProgress(-1);
    var t = { StorageLocationID: $("#ItemStorageLocation_StorageLocationID").val(), SelectedItemIds: selectedids },
        i = $("#InventoryItemForm input[name=__RequestVerificationToken]").val();
    GetOrPostAsync("POST", "/Inventory/VoidReservedItems/", t, i)
        .then((t) => {
            n.stop(), Notify(!0, t), (selectedids = []), ReservedItems(!1);
        })
        .catch((t) => {
            n.stop(), Notify(!1, t);
        });
});
$("#btnViewExpiredBatches").on("click", () => {
    LoadExpiredBatches(), $(".expired-batches-modal").modal("toggle");
});
selectedBatchIds = [];
$("#expiredbatchestable tbody").on("click", 'input[type="checkbox"]', function (n) {
    var t = $(this).closest("tr");
    selectedBatchIds = [];
    $("#expiredbatchestable input[type=checkbox]:checked").each(function () {
        let n = Number($(this).closest("tr").attr("id"));
        isNaN(n) || selectedBatchIds.push(n);
    });
    this.checked ? t.addClass("selected") : t.removeClass("selected");
    updateDataTableSelectAllCtrl2(expiredbatchesTable);
    n.stopPropagation();
});
$('thead input[name="select_all_e"]', expiredbatchesTable.table().container()).on("click", function (n) {
    this.checked ? $('#expiredbatchestable tbody input[type="checkbox"]:not(:checked)').trigger("click") : $('#expiredbatchestable tbody input[type="checkbox"]:checked').trigger("click");
    n.stopPropagation();
});
expiredbatchesTable.on("draw", function () {
    updateDataTableSelectAllCtrl2(expiredbatchesTable);
});
$("#btnDisposeExpired").on("click", () => {
    var n;
    if (selectedBatchIds.length === 0) {
        Notify(!1, "Select atleast one batch.");
        return;
    }
    if (confirm("You are about to dispose the selected batches. Do you wish to continue?")) {
        n = Ladda.create(document.querySelector("#btnDisposeExpired"));
        n.start();
        n.isLoading();
        n.setProgress(-1);
        var t = selectedBatchIds,
            i = $("#SearchProductForm input[name=__RequestVerificationToken]").val();
        GetOrPostAsync("POST", "/Inventory/DisposeExpiredBatches/", t, i)
            .then((t) => {
                n.stop(), Notify(!0, t), LoadExpiredBatches(), (selectedBatchIds = []);
            })
            .catch((t) => {
                n.stop(), Notify(!1, t);
            });
    }
});
$("#btnNearExpiryReport").on("click", () => {
    $("#ReportIframe").attr("src", `/Inventory/NearExpiryReport/?storageLocationID=${$("#ItemStorageLocation_StorageLocationID").val()}`), $(".report-modal").modal("toggle");
});
