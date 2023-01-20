FROM rust:latest
WORKDIR /kernel
RUN apt-get update & apt-get install git
RUN rustup component add rls rust-src rust-analysis rustfmt clippy
RUN cargo install cargo-edit wasm-pack
RUN NEXT_PUBLIC_GA_MEASUREMENT_ID="G-J7JHJXHKX3"
