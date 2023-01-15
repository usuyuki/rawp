docker-compose exec rust wasm-pack build

cp -f kernel/pkg/rawp_kernel_bg.wasm frontend/src/libs/rawp_kernel_bg.wasm
cp -f kernel/pkg/rawp_kernel_bg.wasm.d.ts frontend/src/libs/rawp_kernel_bg.wasm.d.ts
