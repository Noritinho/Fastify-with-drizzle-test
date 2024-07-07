import { and, eq, sum } from 'drizzle-orm';

import { db } from '../../../database/database.config';
import { accounts } from '../../../database/schema/schema';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

export class AccountsService {
  async findAllAccounts() {
    const findAllAccounts = await db.query.accounts.findMany();
    return findAllAccounts;
  }

  async findOneAccount(id: number) {
    const findOneAccount = await db.query.accounts.findMany({
      where: eq(accounts.id, id),
    });

    return findOneAccount;
  }

  async findUserAccounts(id: number) {
    const findUserAccounts = await db.query.accounts.findMany({
      where: eq(accounts.userId, id),
    });

    return findUserAccounts;
  }

  async findUserTotalAccountValue(userId: number) {
    const accountsReceivable = await db
      .select({
        value: sum(accounts.value),
      })
      .from(accounts)
      .where(
        and(
          eq(accounts.userId, userId),
          eq(accounts.account_type, 'RECEIVABLE')
        )
      );

    const accountsPayable = await db
      .select({
        value: sum(accounts.value),
      })
      .from(accounts)
      .where(
        and(eq(accounts.userId, userId), eq(accounts.account_type, 'PAYABLE'))
      );

    if (!accountsReceivable[0].value && accountsPayable[0].value) {
      return accountsPayable[0].value;
    }

    if (accountsReceivable[0].value && !accountsPayable[0].value) {
      return accountsReceivable[0].value;
    }

    return accountsReceivable[0].value && accountsPayable[0].value
      ? parseFloat(accountsReceivable[0].value) -
          parseFloat(accountsPayable[0].value)
      : 'Erro';
  }

  async createAccount(userId: number, createAccountDto: CreateAccountDto) {
    const { description, value, account_type } = createAccountDto;

    await db.insert(accounts).values({
      userId: userId,
      description: description,
      value: value,
      account_type: account_type,
    });
  }

  async updateAccount(userId: number, updateAccountDto: UpdateAccountDto) {
    const account = updateAccountDto;

    await db.update(accounts).set(account).where(eq(accounts.id, userId));
  }

  async deleteAccount(id: number) {
    await db.delete(accounts).where(eq(accounts.id, id));
  }
}
