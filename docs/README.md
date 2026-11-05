# CGT V1.50 Lua API - docs site

VitePress documentation for the CreativeGrowtopia **V1.50** Lua scripting API. Function names,
parameter types, return-table fields and enum constants are **reverse-engineered from the binary**
(`lib/arm64-v8a/libregrowtopia.so`, APK `CreativeGrowtopia-V1.50-CPS`); descriptions are inferred.

## Develop

```bash
cd docs
npm install
npm run docs:dev      # local preview at http://localhost:5173
npm run docs:build    # static build into .vitepress/dist
```

## Regenerating the API pages

The category pages, `structs.md`, `enums.md`, `internal.md` and the sidebar are **generated** from
reverse-engineering data - do not hand-edit them. The hand-written pages are `index.md`,
`guide/*.md` and `examples.md`.

Pipeline (run from the repo's `apk/` folder):

```bash
# 1. extract the pristine V1.50 .so from the APK
python -c "import zipfile;open('re/ori_V1.50.so','wb').write(zipfile.ZipFile('CreativeGrowtopia-V1.50-CPS.apk').read('lib/arm64-v8a/libregrowtopia.so'))"

# 2. names -> addresses, then signatures/structs/enums
set ARMLIB=re/ori_V1.50.so
python -I re/extract_lua_api.py     # -> re/name_addr.json
python -I re/extract_sigs.py        # -> re/sigs.json

# 3. render the markdown + sidebar into docs/
python -I re/gen_docs.py
```

Edit the curated maps (categories, descriptions, struct names) at the top of `apk/re/gen_docs.py`.

## Deploy

Pushing to `main`/`master` runs `.github/workflows/deploy-docs.yml`, which builds with
`DOCS_BASE=/<repo>/` and publishes to GitHub Pages. Enable **Settings → Pages → Source: GitHub Actions**
once on the repo.
