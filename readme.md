git submodule add https://github.com/graphprotocol/graph-node.git dev/graph-node

git submodule update --init --recursive
npm install -g @graphprotocol/graph-cli
cd backend/subgraph
graph init --from-example gorj00/dstream-graph ethereum
truffle compile
truffle migrate
npm run codegen
npm install
npm run build

cd dev/graph-node/docker 
docker-compose up
<!-- https://ethereum.stackexchange.com/questions/99409/failed-to-deploy-to-graph-node-ethereum-network-not-supported-by-registrar-mai -->
