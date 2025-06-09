class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            return self.balance
        return "Invalid deposit"

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            return self.balance
        return "Insufficient funds"

acc = BankAccount("Alice", 1000)
print(acc.deposit(500))
print(acc.withdraw(300))
