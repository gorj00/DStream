#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]

use diesel::{
    pg::types::sql_types,
    sql_types::{Binary, Integer, Jsonb, Nullable},
    types::Bytea,
    PgConnection, QueryDsl, RunQueryDsl,
};
use graph::{
    components::store::StoredDynamicDataSource,
    prelude::{serde_json, BlockNumber, StoreError},
};

use crate::primary::Namespace;

type DynTable = diesel_dynamic_schema::Table<String, Namespace>;
type DynColumn<ST> = diesel_dynamic_schema::Column<DynTable, &'static str, ST>;

#[derive(Debug)]
pub(crate) struct DataSourcesTable {
    namespace: Namespace,
    qname: String,
    table: DynTable,
    block_range: DynColumn<sql_types::Range<Integer>>,
    causality_region: DynColumn<Integer>,
    manifest_idx: DynColumn<Integer>,
    param: DynColumn<Nullable<Binary>>,
    context: DynColumn<Nullable<Jsonb>>,
}

impl DataSourcesTable {
    const TABLE_NAME: &'static str = "data_sources$";

    pub(crate) fn new(namespace: Namespace) -> Self {
        let table =
            diesel_dynamic_schema::schema(namespace.clone()).table(Self::TABLE_NAME.to_string());

        DataSourcesTable {
            qname: format!("{}.{}", namespace, Self::TABLE_NAME),
            namespace,
            block_range: table.column("block_range"),
            causality_region: table.column("causality_region"),
            manifest_idx: table.column("manifest_idx"),
            param: table.column("param"),
            context: table.column("context"),
            table,
        }
    }

    pub(crate) fn as_ddl(&self) -> String {
        format!(
            "
            create table {nsp}.{table} (
                vid integer generated by default as identity primary key,
                block_range int4range not null,
                causality_region integer generated by default as identity,
                manifest_idx integer not null,
                parent integer references {nsp}.{table},
                id bytea,
                param bytea,
                context jsonb
            );

            create index gist_block_range_data_sources$ on {nsp}.data_sources$ using gist (block_range);
            ",
            nsp = self.namespace.to_string(),
            table = Self::TABLE_NAME
        )
    }

    // Query to load the data sources which are live at `block`. Ordering by the creation block and
    // `vid` makes sure they are in insertion order which is important for the correctness of
    // reverts and the execution order of triggers. See also 8f1bca33-d3b7-4035-affc-fd6161a12448.
    pub(super) fn load(
        &self,
        conn: &PgConnection,
        block: BlockNumber,
    ) -> Result<Vec<StoredDynamicDataSource>, StoreError> {
        // self.table
        //     .select((
        //         self.block_range,
        //         self.manifest_idx,
        //         self.param,
        //         self.context,
        //     ))
        //     .load(conn)?;

        todo!()
    }

    pub(crate) fn insert(
        &self,
        conn: &PgConnection,
        data_sources: &[StoredDynamicDataSource],
        block: BlockNumber,
    ) -> Result<usize, StoreError> {
        todo!()
    }

    pub(crate) fn revert(&self, conn: &PgConnection, block: BlockNumber) -> Result<(), StoreError> {
        todo!()
    }
}
