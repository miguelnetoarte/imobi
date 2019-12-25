# IMOBI

Calculadora de tabelas para financiamento imobiliário

## Objeto de parâmetro para cálculo

| Atributo       | Tipo   | Descrição                                                     | requerimento |
|----------------|--------|---------------------------------------------------------------|--------------|
| table          | string | tabela de cálculo                                             | obrigatório  |
| financedAmount | number | Valor financiado                                              | obrigatório  |
| deadline       | number | Número de meses                                               | obrigatório  |
| annualTaxRate  | number | Taxa anual de juros                                           | obrigatório  |
| admTaxesRate   | number | Taxa de administração                                         | opcional     |
| expenses       | number | Despesas                                                      | opcional     |
| insurence      | object | Objeto para cálculo do seguro                                 | opcional     |
| dfiTaxesRate   | number | Alíquota para cálculo de Danos físicos ao imóvel (DFI)        | opcional     |
| mipTaxesRate   | number | Alíquota para cálculo de Morte por invalidez permanente (MIP) | opcional     |
| estateValue    | number | Valor do imóvel para cálculo do seguro                        | opcional     |

## Sistema de amortização constante (SAC)

```js

import imobi from 'imobi';

const data = imobi.calculator({
    "table": "SAC",
    "financedAmount": 150000,
    "deadline": 360,
    "annualTaxRate": 0.72,
    "admTaxesRate": 25,
    "insurence": {
        "estateValue": 200000,
        "mipTaxesRate": 0.0001737,
        "dfiTaxesRate": 0.0001503,
    },
    "expenses": 0
});

```

