const InventoryStatusBadge = ({ stock }) => {
  if (stock === 0)
    return (
      <span className="flex items-center gap-1.5 text-[10px] text-[#ff6b6b] [font-family:'Manrope-Regular',Helvetica]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b6b]" />
        Hết hàng
      </span>
    );
  if (stock <= 10)
    return (
      <span className="flex items-center gap-1.5 text-[10px] text-[#fac493] [font-family:'Manrope-Regular',Helvetica]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#fac493]" />
        Sắp hết
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 text-[10px] text-[#7dd3a8] [font-family:'Manrope-Regular',Helvetica]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#7dd3a8]" />
      Còn hàng
    </span>
  );
};

export default InventoryStatusBadge;