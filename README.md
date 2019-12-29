# IMOBI

Calculadora de tabelas para financiamento imobiliário

## Objeto de parâmetro para cálculo

| Atributo            | Tipo   | Descrição                                                     | requerimento |
|---------------------|--------|---------------------------------------------------------------|--------------|
| table               | string | tabela de cálculo                                             | obrigatório  |
| financedAmount      | number | Valor financiado                                              | obrigatório  |
| deadline            | number | Número de meses                                               | obrigatório  |
| annualTaxRate       | number | Taxa anual de juros                                           | obrigatório  |
| firstInstallmentDue | Date   | Vencimento da primeira prestação devida                       | opcional     |
| gracePeriod         | number | Periodo de carencia                                           | opcional     |
| admTaxesRate        | number | Taxa de administração                                         | opcional     |
| expenses            | number | Despesas                                                      | opcional     |
| insurence           | object | Objeto para cálculo do seguro                                 | opcional     |
| dfiTaxesRate        | number | Alíquota para cálculo de Danos físicos ao imóvel (DFI)        | opcional     |
| mipTaxesRate        | number | Alíquota para cálculo de Morte por invalidez permanente (MIP) | opcional     |
| estateValue         | number | Valor do imóvel para cálculo do seguro                        | opcional     |

## Sistema de amortização constante (SAC)

```js

import imobi from 'imobi';

const data = imobi.calculator({
    "table": "SAC",
    "financedAmount": 150000,
    "deadline": 5,
    "annualTaxRate": 0.72,
    "admTaxesRate": 25,
    "gracePeriod": 2,
    "firstInstallmentDue": new Date("2020-01-12"),
    "insurence": {
        "estateValue": 200000,
        "mipTaxesRate": 0.0001737,
        "dfiTaxesRate": 0.0001503,
    },
    "expenses": 0
});

```

# Sistema Frânces de amortização (PRICE)

```js

import imobi from 'imobi';

const data = imobi.calculator({
    "table": "PRICE",
    "financedAmount": 150000,
    "deadline": 5,
    "annualTaxRate": 0.72,
    "admTaxesRate": 25,
    "gracePeriod": 2,
    "firstInstallmentDue": new Date("2020-01-12"),
    "insurence": {
        "estateValue": 200000,
        "mipTaxesRate": 0.0001737,
        "dfiTaxesRate": 0.0001503,
    },
    "expenses": 0
});

```

## Objeto de resposta

| Atributo          | Tipo   | Descrição                                |
|-------------------|--------|------------------------------------------|
| installments      | object | objeto com dados das prestações          |
| installment       | number | número da prestação                      |
| amortization      | number | valor da amortização                     |
| interestRate      | number | valor do juros                           |
| admTaxesRate      | number | taxa de administração                    |
| insurence         | object | objeto com dados do seguro               |
| insurenceValue    | number | valor do seguro                          |
| mip               | number | valor do MIP                             |
| dfi               | number | valor do DFI                             |
| installmentValue  | number | valor da prestação                       |
| installmentDue    | number | vencimento do valor devido               |
| debitBalance      | number | valor do saldo devido                    |
| deadline          | number | prazo calculado                          |
| installmentsTotal | number | total do saldo devido                    |
| amortizationTotal | number | total de amortização                     |
| financedValue     | number | valor financiado                         |
| interestRateTotal | number | total de juros calculado                 |
| table             | string | tabela utilizada para calculo            |
| annualTaxRate     | number | taxa anual de juros utilizada no cálculo |
| admTaxesRate      | number | taxa de administração                    |
| gracePeriod       | number | periodo de carencia (PRICE em dev)       |