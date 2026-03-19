const formatPackage = (pkg) => {
  if (!pkg) return null

  return {
    packageID: pkg.packageID,
    title: pkg.title,
    description: pkg.description,
    price: Number(pkg.price),
    deliveryDay: pkg.deliveryDay,
    revision: pkg.revision,
    gigID: pkg.gigID
  }
}

module.exports = formatPackage