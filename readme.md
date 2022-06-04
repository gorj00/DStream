git submodule add https://github.com/graphprotocol/graph-node.git dev/graph-node

git submodule update --init --recursive
cd backend/subgraph
graph init --from-example gorj00/dstream-graph ethereum
truffle compile
truffle migrate
npm run codegen
npm run build

cd dev/graph-node/docker 
docker-compose up
