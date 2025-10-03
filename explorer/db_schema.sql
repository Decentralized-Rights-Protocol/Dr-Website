-- DRP Explorer database schema (SQLite)

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS blocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    block_number INTEGER UNIQUE,
    hash TEXT UNIQUE,
    timestamp INTEGER,
    consensus_type TEXT,
    elder_signatures TEXT -- JSON encoded: { signers: [...], threshold: N }
);

CREATE INDEX IF NOT EXISTS idx_blocks_number ON blocks(block_number);
CREATE INDEX IF NOT EXISTS idx_blocks_hash ON blocks(hash);

CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tx_id TEXT UNIQUE,
    block_hash TEXT,
    sender TEXT,
    receiver TEXT,
    value REAL,
    activity_proof TEXT, -- JSON encoded: { post: 'verified'|'failed', poat: 'verified'|'failed', ... }
    status TEXT
);

CREATE INDEX IF NOT EXISTS idx_transactions_txid ON transactions(tx_id);
CREATE INDEX IF NOT EXISTS idx_transactions_sender ON transactions(sender);
CREATE INDEX IF NOT EXISTS idx_transactions_receiver ON transactions(receiver);
CREATE INDEX IF NOT EXISTS idx_transactions_block_hash ON transactions(block_hash);

CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address TEXT UNIQUE,
    balance REAL,
    activity_logs TEXT -- JSON array of summarized activity entries
);

CREATE INDEX IF NOT EXISTS idx_accounts_address ON accounts(address);


