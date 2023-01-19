docker-compose exec rust wasm-pack build

cp -f kernel/pkg/rawp_kernel_bg.wasm frontend/src/wasm/rawpKernel/rawp_kernel_bg.wasm
cp -f kernel/pkg/rawp_kernel_bg.wasm.d.ts frontend/src/wasm/rawpKernel/rawp_kernel_bg.wasm.d.ts
cp -f kernel/pkg/rawp_kernel.d.ts frontend/src/wasm/rawpKernel/rawp_kernel.d.ts
cp -f kernel/pkg/rawp_kernel.js frontend/src/wasm/rawpKernel/rawp_kernel.js
cp -f kernel/pkg/rawp_kernel_bg.js frontend/src/wasm/rawpKernel/rawp_kernel_bg.js
