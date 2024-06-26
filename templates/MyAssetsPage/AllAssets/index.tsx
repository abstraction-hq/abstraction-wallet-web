import Link from "next/link";
import Card from "@/components/Card";
import Image from "@/components/Image";
import CurrencyFormat from "@/components/CurrencyFormat";
import Icon from "@/components/Icon";

import Tabs from "@/components/Tabs";
import { useState } from "react";
import Select from "@/components/Select";
import { WalletBalance } from "@/apis/fetchWalletBalance";
import { formatEther } from "viem";

const typeItems = [
  {
    id: "0",
    title: "Crypto",
  },
  {
    id: "1",
    title: "NFTs",
  },
  {
    id: "2",
    title: "Defi",
  },
  {
    id: "3",
    title: "Transactions",
  },
];

type AllAssetsProps = {
  walletBalance: WalletBalance;
};

const AllAssets = ({ walletBalance }: AllAssetsProps) => {
  const [type, setType] = useState(typeItems[0]);
  const assets = [];

  assets.push({
    id: "0",
    logo: "/images/dcr.svg",
    currency: "VIC",
    balance: parseFloat(formatEther(walletBalance.vicBalance)),
    price: walletBalance.vicPrice,
  });

  for (const token of walletBalance.tokenBalances) {
    assets.push({
      id: token.tokenAddress,
      logo: "/images/dcr.svg",
      currency: token.tokenSymbol,
      balance: parseFloat(formatEther(token.tokenBalance)),
      price: 0
    });
  }

  return (
    <Card className="grow" title={"All assets"} tooltip="Tooltip all assets">
      <div className="flex mb-4 md:hidden">
        <Tabs
          className="mr-auto"
          items={typeItems}
          value={type}
          setValue={setType}
        />
        <Select
          className="hidden -mb-2 md:block"
          value={type}
          onChange={setType}
          items={typeItems}
        />
      </div>
      <div className="mt-5 -mx-6 md:-mx-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="pl-6 py-3 text-left text-caption-2m text-theme-secondary md:pl-4">
                Name
              </th>
              <th className="pl-4 py-3 text-left text-caption-2m text-theme-secondary">
                Balance
              </th>
              <th className="pl-4 py-3 text-left text-caption-2m text-theme-secondary md:hidden">
                Price
              </th>
              <th className="pl-4 py-3 text-left text-caption-2m text-theme-secondary md:hidden">
                Value
              </th>
              <th className="pl-4 py-3 pr-6 text-left text-caption-2m text-theme-secondary md:pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr className="" key={asset.id}>
                <td className="border-t border-theme-stroke pl-6 py-3 md:pl-4">
                  <div className="inline-flex items-center text-base-1s">
                    <div className="crypto-logo shrink-0 mr-4">
                      <Image
                        className="w-8 opacity-100"
                        src={asset.logo}
                        width={32}
                        height={32}
                        alt=""
                      />
                    </div>
                    {asset.currency}
                  </div>
                </td>
                <td className="border-t border-theme-stroke pl-4 py-3">
                  <CurrencyFormat
                    className="text-base-1s"
                    value={asset.balance}
                  />
                </td>
                <td className="border-t border-theme-stroke pl-4 py-3 text-base-1s text-theme-secondary md:hidden">
                  ${asset.price}
                </td>
                <td className="border-t border-theme-stroke pl-4 py-3 text-base-1s text-theme-secondary md:hidden">
                  ${asset.balance * asset.price}
                </td>
                <td className="border-t border-theme-stroke pl-4 py-3 pr-6 text-right md:pr-4">
                  <div className="inline-flex space-x-2">
                    <Link
                      className="btn-gray min-w-[5.5rem] h-10 md:min-w-fit md:w-10 md:p-0"
                      href="/token"
                    >
                      <span className="md:hidden">Send</span>
                      <Icon
                        className="hidden !fill-theme-secondary md:inline-block md:!m-0"
                        name="plus"
                      />
                    </Link>
                    <Link
                      className="btn-gray min-w-[5.5rem] h-10 md:min-w-fit md:w-10 md:p-0"
                      href="/asset"
                    >
                      <span className="md:hidden">Detail</span>
                      <Icon
                        className="hidden !fill-theme-secondary md:inline-block md:!m-0"
                        name="arrow-up-right-thin"
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AllAssets;
