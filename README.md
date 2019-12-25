# IMOBI

Calculadora de tabelas para financiamento imobiliário

## Objeto de Parâmetro


## Sistema de amortização constante (SAC)

```js

const imobi = require('imobi');

const data = imobi.calculator({
        "table": "SAC",
        "financedAmount": 200000,
        "deadline": 360,
        "annualTaxRate": 7.7,
        "expenses": 0
    });

```

