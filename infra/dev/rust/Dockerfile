FROM rust:latest
WORKDIR /kernel
RUN apt-get update & apt-get install git
RUN rustup component add rls rust-src rust-analysis rustfmt clippy
RUN cargo install cargo-edit 
