
function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
          <div className="h-48 bg-gray-100"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-100 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-2/3"></div>
            </div>
            <div className="h-8 bg-gray-100 rounded w-1/2"></div>
            <div className="h-10 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton