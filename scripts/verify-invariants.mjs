import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Read literal data without evaluating application code or importing PNGs into Node.
function readExport(relativePath, exportName) {
  const filename = path.join(root, relativePath);
  const source = ts.createSourceFile(filename, fs.readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true);
  assert.equal(source.parseDiagnostics.length, 0, `${relativePath}: invalid TypeScript`);
  const assets = new Map();
  let declaration;
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement) && statement.importClause?.name && statement.moduleSpecifier.text.startsWith("@/assets/")) {
      assets.set(statement.importClause.name.text, path.join(root, "src", statement.moduleSpecifier.text.slice(2)));
    }
    if (ts.isVariableStatement(statement)) {
      declaration ??= statement.declarationList.declarations.find((item) => item.name.getText(source) === exportName);
    }
  }
  assert.ok(declaration?.initializer, `${relativePath}: missing ${exportName}`);
  function literal(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
    if (ts.isObjectLiteralExpression(node)) {
      return Object.fromEntries(node.properties.map((property) => {
        assert.ok(ts.isPropertyAssignment(property), `${relativePath}: expected literal property`);
        return [property.name.text, literal(property.initializer)];
      }));
    }
    if (ts.isIdentifier(node) && assets.has(node.text)) return assets.get(node.text);
    throw new Error(`${relativePath}: unsupported data expression ${node.getText(source)}`);
  }
  return literal(declaration.initializer);
}

function stringPaths(value, prefix = "") {
  if (typeof value === "string") {
    assert.ok(value.trim(), `Empty translation: ${prefix}`);
    return [prefix];
  }
  assert.ok(value && typeof value === "object", `Expected translated content: ${prefix}`);
  return Object.entries(value).flatMap(([key, child]) => stringPaths(child, `${prefix}.${key}`)).sort();
}

const products = readExport("src/data/products.ts", "products");
const translations = readExport("src/i18n/translations.ts", "translations");
const locales = ["ckb", "ar", "en"];
assert.ok(products.length > 0, "Product catalog is empty");
assert.equal(new Set(products.map((product) => product.slug)).size, products.length, "Product slugs must be unique");
assert.deepEqual(Object.keys(translations).sort(), [...locales].sort(), "Unexpected interface locales");
const interfacePaths = stringPaths(translations.en);
for (const locale of locales) {
  assert.deepEqual(stringPaths(translations[locale]), interfacePaths, `${locale}: interface translation keys differ`);
}

let assetCount = 0;
const checkedAssets = new Set();
for (const product of products) {
  assert.match(product.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid product slug");
  assert.ok(product.mockups.length > 0, `${product.slug}: missing screenshots`);
  const contentPaths = stringPaths(product.translations.en);
  for (const locale of locales) {
    assert.deepEqual(stringPaths(product.translations[locale]), contentPaths, `${product.slug}/${locale}: product translation keys differ`);
  }
  for (const asset of [product.icon, ...product.mockups]) {
    assert.ok(typeof asset === "string" && asset.startsWith(path.join(root, "src", "assets") + path.sep), `${product.slug}: invalid asset reference`);
    if (checkedAssets.has(asset)) continue;
    assert.ok(fs.statSync(asset).isFile() && fs.statSync(asset).size > 0, `Missing or empty asset: ${path.relative(root, asset)}`);
    checkedAssets.add(asset);
    assetCount++;
  }
}
console.log(`Verified ${products.length} unique product routes, ${assetCount} source assets, and nested translation parity across ${locales.join(", ")}.`);
