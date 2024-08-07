<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="income" :expenses="expenses" />
    <TransactionList
      :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { ref, computed, onMounted } from 'vue';
import type { Transaction, TransactionFn } from './types';
import { useToast } from 'vue-toastification';

const toast = useToast();

const transactions = ref<Transaction[]>([]);

onMounted(() => {
  const savedTransactions = localStorage.getItem
    ? JSON.parse(localStorage.getItem('transactions')!)
    : null;

  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});

// get total
const total = computed(() => {
  return transactions.value.reduce((acc, val) => acc + val.amount, 0);
});

// get income
const income = computed(() => {
  return transactions.value
    .filter((x) => x.amount >= 0)
    .reduce((acc, val) => acc + val.amount, 0);
});

// get expenses
const expenses = computed(() => {
  return transactions.value.reduce(
    (acc, val) => acc + (val.amount < 0 ? val.amount : 0),
    0
  );
});

// add transaction
const handleTransactionSubmitted: TransactionFn = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: formatText(transactionData.text),
    amount: transactionData.amount,
  });

  saveTransactionsToLocalStorage();

  toast.success('Transaction added');
};

// generated id
const generateUniqueId = () => {
  return Math.floor(Math.random() * 100000000000);
};

// format text
const formatText = (str: string) => {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;
};

const handleTransactionDeleted = (id: number) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );

  saveTransactionsToLocalStorage();

  toast.success('Transaction deleted');
};

// save to localstorage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
};
</script>
