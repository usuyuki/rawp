FROM rust:latest
WORKDIR /kernel
RUN apt-get update & apt-get install git
RUN rustup component add rls rust-src rust-analysis 
RUN cargo install cargo-edit 
