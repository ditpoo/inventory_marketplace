CREATE TABLE IF NOT EXISTS Products (
    id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(6,2) NOT NULL,
    quantity int NOT NULL DEFAULT 0,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
