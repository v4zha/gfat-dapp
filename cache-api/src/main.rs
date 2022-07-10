use std::str::FromStr;
use std::time::Duration;
use ethers::{prelude::*};
use std::sync::Arc;

abigen!(GFAT,"./assets/GFAT.json",event_derives(serde::Deserialize,serde::Serialize));
#[tokio::main]
async fn main(){
    let url="http://127.0.0.1:8545".to_string();
    let key="";
    let provider=Provider::<Http>::try_from(url).expect("Error in url").interval(Duration::from_millis(10));
    let chain_id=provider.get_chainid().await.expect("Error in chain Id");
    let wallet=LocalWallet::from_str(key).expect("Error in Key parsing").with_chain_id(chain_id.as_u64());
    let client=Arc::new(SignerMiddleware::new(provider,wallet));
    let contract_addr:Address="0xA650aaa996ca5B1Da917250c7FE80B3671f12f26".parse().expect("Error parsing contract address");
    let contract =GFAT::new(contract_addr,client);
    // let res:u32=contract.get_dep_count().call().await.expect("Error in calling function");
    // Ok(()) 
}