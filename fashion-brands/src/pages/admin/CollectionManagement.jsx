import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardNavigationSidebarSection } from "@/components/admin/DashboardNavigationSidebarSection";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ArrowUpDown, Plus, X, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { collectionService } from "@/services/collectionService";
import { toast } from "sonner";
import { supabase } from "@/api/supabase";

const StatusBadge = ({ status }) => {
  const { t } = useTranslation();
  return status === "active" ? (
    <span className="flex items-center gap-1.5 text-[10px] text-[#7dd3a8] [font-family:'Manrope-Regular',Helvetica] uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-[#7dd3a8]" /> {t("admin.active")}
    </span>
  ) : (
    <span className="flex items-center gap-1.5 text-[10px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica] uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff40]" /> {t("admin.draft")}
    </span>
  );
};

const CollectionModal = ({ initialData, onClose, onSave }) => {
  const { t } = useTranslation();
  const labelCls = "text-[9px] tracking-[1.5px] text-[#ffffff40] uppercase [font-family:'Manrope-Regular',Helvetica]";
  const inputCls = "w-full bg-[#131313] border border-[#ffffff15] px-3 py-2.5 text-[12px] text-[#e8e2d9] outline-none placeholder:text-[#ffffff20] focus:border-[#fac49360] transition-colors [font-family:'Manrope-Regular',Helvetica]";

  const isEdit = !!initialData;
  const [form, setForm] = useState({
    name: initialData?.name || "",
    brand: initialData?.brand || "FASHY",
    category: initialData?.category || "apparel",
    status: initialData?.status || "active",
  });
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name.trim()) return setError(t("admin.name_required") || "Name is required");
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        category: form.category,
        status: form.status,
      };
      
      if (isEdit) {
        await collectionService.updateCollection(initialData.id, payload);
      } else {
        await collectionService.createCollection(payload);
      }
      
      onSave();
      onClose();
    } catch (err) {
      console.error("Failed to save collection:", err);
      toast.error(err.message || "Failed to save collection");
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#000000cc] backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-[#131313] border border-[#ffffff15] p-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-[2px] h-4 bg-[#fac493]" />
            <p className="text-[11px] tracking-[2px] text-[#fac493] [font-family:'Manrope-Bold',Helvetica]">
              {(isEdit ? t("admin.edit_collection", "Edit Collection") : t("admin.create_new_collection")).toUpperCase()}
            </p>
          </div>
          <button onClick={onClose} className="text-[#ffffff30] hover:text-[#ffffff70] transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{t("admin.collection_name")}</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g., Aurora Borealis"
              className={inputCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{t("admin.brand") || "Brand"}</label>
            <input
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              placeholder="e.g., FASHY"
              className={inputCls}
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{t("admin.category")}</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputCls}
            >
              <option value="apparel">{t("admin.apparel")}</option>
              <option value="jewelry">{t("admin.jewelry")}</option>
              <option value="accessories">{t("admin.accessories")}</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{t("admin.status")}</label>
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
              className={inputCls}
            >
              <option value="active">{t("admin.active")}</option>
              <option value="draft">{t("admin.draft")}</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-[10px] text-[#ff6b6b] uppercase tracking-widest">{error}</p>
        )}

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-[#ffffff20] text-[10px] tracking-[2px] text-[#ffffff45] hover:text-[#ffffff70] hover:border-[#ffffff35] transition-colors [font-family:'Manrope-Regular',Helvetica]"
          >
            {t("admin.discard")}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-[#fac493] text-[#131313] text-[10px] tracking-[2px] [font-family:'Manrope-Bold',Helvetica] hover:bg-[#f5b97e] transition-colors"
          >
            {(isEdit ? t("admin.save_changes", "Save Changes") : t("admin.save_product")).toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

const CollectionManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [collectionList, setCollectionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  useEffect(() => {
    fetchCollections();

    const channel = supabase
      .channel('admin-collections')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'collections' }, () => {
        fetchCollections();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchCollections() {
    try {
      setLoading(true);
      const data = await collectionService.getAllCollections();
      setCollectionList(data || []);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = collectionList.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm(t("admin.delete_confirm") || "Are you sure?")) return;
    try {
      await collectionService.deleteCollection(id);
      toast.success(t("admin.delete_success") || "Deleted");
      fetchCollections();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const openCreate = () => {
    setEditTarget(null);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditTarget(c);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
      <Header />

      {showModal && (
        <CollectionModal
          initialData={editTarget}
          onClose={() => setShowModal(false)}
          onSave={fetchCollections}
        />
      )}

      <div className="grid flex-1 pt-[68px]" style={{ gridTemplateColumns: "185px 1fr" }}>
        <DashboardNavigationSidebarSection />

        <main>
          <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-12">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 bg-[#fac493]" />
              <p className="text-[11px] tracking-[2px] text-[#fac493] [font-family:'Manrope-Bold',Helvetica]">
                {t("admin.content_mgmt")}
              </p>
            </div>
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-1">
                  {t("admin.brands_collections")}
                </h1>
                <p className="text-sm text-[#ffffff50] [font-family:'Manrope-Regular',Helvetica]">
                  {t("admin.forge_subtitle")}
                </p>
              </div>
              <button
                onClick={openCreate}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#fac493] text-[#131313] text-[10px] tracking-[2px] [font-family:'Manrope-Bold',Helvetica] hover:bg-[#f5b97e] transition-colors"
              >
                <Plus size={12} /> {t("admin.create_new_collection").toUpperCase()}
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#ffffff15] px-4 py-2.5 mb-6">
              <Search size={13} className="text-[#ffffff40]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("admin.search_collections")}
                className="flex-1 bg-transparent text-[11px] tracking-[1px] text-[#e8e2d9] placeholder:text-[#ffffff30] outline-none [font-family:'Manrope-Regular',Helvetica]"
              />
            </div>

            {/* Table */}
            <div className="border border-[#ffffff10] mb-10 overflow-x-auto">
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#ffffff10] min-w-[600px]">
                <p className="text-[10px] tracking-[2px] text-[#e8e2d9] [font-family:'Manrope-Bold',Helvetica]">
                  {t("admin.collection_list")}
                </p>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <Loader2 className="w-8 h-8 text-[#fac493] animate-spin" />
                  <p className="text-[10px] tracking-[2px] text-[#ffffff40] uppercase">{t("admin.loading")}</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-12 text-center text-[#ffffff30] text-sm [font-family:'Manrope-Regular',Helvetica]">
                  {t("admin.no_data")}
                </div>
              ) : (
                filtered.map((c, i) => (
                  <div
                    key={c.id}
                    className={`flex items-center px-4 py-4 border-b border-[#ffffff08] hover:bg-[#ffffff04] transition-colors min-w-[600px] ${i % 2 === 0 ? "" : "bg-[#ffffff02]"}`}
                  >
                    <div className="w-[10%]">
                      <div className="w-10 h-10 bg-[#2a2a2a] overflow-hidden flex items-center justify-center">
                        <span className="text-[#ffffff20] text-[8px]">COL</span>
                      </div>
                    </div>

                    <div className="w-[28%]">
                      <p className="text-[12px] text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">{c.name}</p>
                    </div>

                    <div className="w-[20%] text-[10px] text-[#ffffff60] tracking-wider [font-family:'Manrope-Regular',Helvetica]">
                      {c.brand || "FASHY"}
                    </div>

                    <div className="w-[14%] text-[11px] text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica] uppercase">
                      {c.category || "—"}
                    </div>

                    <div className="w-[14%]">
                      <StatusBadge status={c.status || "active"} />
                    </div>

                    <div className="w-[14%] flex items-center gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="px-3 py-1 border border-[#ffffff20] text-[#fac493] text-[9px] tracking-[1px] [font-family:'Manrope-Regular',Helvetica] hover:border-[#fac493] transition-colors"
                      >
                        {t("admin.edit", "EDIT").toUpperCase()}
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="px-3 py-1 border border-[#ffffff20] text-[#ffffff60] text-[9px] tracking-[1px] [font-family:'Manrope-Regular',Helvetica] hover:border-[#ff6b6b] hover:text-[#ff6b6b] transition-colors"
                      >
                        {t("admin.delete").toUpperCase()}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CollectionManagement;