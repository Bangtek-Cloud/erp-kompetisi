import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { createTournament, getTournamentById, updateTournament } from "@/services/tournament";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import useAuthStore from "@/store/feature/authStand";

interface TournamentFormProps {
  isOpen: boolean;
  setOpen: any;
  tournamentId?: string;
  actionType: "create" | "update";
}

export default function TournamentDrawer({
  isOpen,
  setOpen,
  tournamentId,
  actionType,
}: TournamentFormProps) {
  const { accessToken } = useAuthStore()
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [rules, setRules] = useState<string[]>([""]);
  const [disabled, setDisabled] = useState(false);
  const [prizes, setPrizes] = useState<{ title: string;  value: string }[]>([{ title: "", value: "" }]);
  const [prices, setPrices] = useState<{ key: number; description: string; value: string; amount: number }[]>([{ key: 1, value: "", amount: 0, description: "", }]);
  const [usingLogoPrice, setUsingLogoPrice] = useState(0);
  const [status, setStatus] = useState<"UPCOMING" | "ONGOING" | "COMPLETE">("UPCOMING");

  useEffect(() => {
    if (actionType === "update" && tournamentId) {
      const fetchTournamentData = async () => {
        const tournament = await getTournamentById(tournamentId, accessToken || "");
        const datas = tournament.data
        if (!tournament) return;

        setName(datas.name);
        setDescription(datas.description);
        setLocation(datas.location);
        setStartDate(datas.startDate);
        setEndDate(datas.endDate);
        setMaxParticipants(datas.maxParticipants);
        setRules(datas.rules || []);
        setPrizes(datas.prize || []);
        setPrices(datas.price || []);
        setStatus(datas.status || "UPCOMING");
        setDisabled(datas.disabled || false);
        setUsingLogoPrice(datas.usingLogoPrice || 0);
      };

      fetchTournamentData();
    }
  }, [tournamentId, actionType, accessToken]);

  const handleCreateOrUpdate = async () => {
    const tournamentData = {
      name,
      description,
      startDate,
      endDate,
      maxParticipants,
      location,
      rules,
      disabled,
      status,
      prize: prizes,
      price: prices,
      usingLogoPrice,
    };

    try {
      if (actionType === "create") {
        const data = await createTournament(accessToken as string, tournamentData);
        if (data) {
          setOpen(false);
        }
      } else {
        const data = await updateTournament(accessToken as string, tournamentId as string, tournamentData);
        if (data) {
          setOpen(false);
        }
      }
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{actionType === "create" ? "Buat Turnamen Baru" : "Update Turnamen"}</DrawerTitle>
          <DrawerDescription>Form untuk membuat atau memperbarui turnamen</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[400px] mx-4">
          <div className="mx-4">
            <div className="mt-4">
              <label>Nama Turnamen</label>
              <Input
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="Masukkan nama turnamen"
              />
            </div>

            {/* Deskripsi */}
            <div className="mt-4">
              <label>Deskripsi</label>
              <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                placeholder="Masukkan deskripsi turnamen"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Gunakan Logo (Biaya Tambahan) */}
            <div className="mt-4">
              <label>Gunakan Logo (Biaya Tambahan)</label>
              <Input value={usingLogoPrice} type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsingLogoPrice(parseInt(e.target.value))} placeholder="Masukkan biaya tambahan untuk logo" />
            </div>

            {/* Aturan */}
            <div className="mt-4">
              <label>Aturan</label>
              {rules.map((rule, index) => (
                <div key={index} className="mt-2">
                  <Input
                    value={rule}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const updatedRules = [...rules];
                      updatedRules[index] = e.target.value;
                      setRules(updatedRules);
                    }}
                    placeholder={`Aturan ${index + 1}`}
                  />
                </div>
              ))}
              <Button variant="link" onClick={() => setRules([...rules, ""])}>Tambah Aturan</Button>
            </div>

            {/* Hadiah */}
            <div className="mt-4">
              <label>Hadiah</label>
              {prizes.map((prize, index) => (
                <div key={index} className="flex gap-4 mt-2">
                  <Input
                    value={prize.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const updatedPrizes = [...prizes];
                      updatedPrizes[index].title = e.target.value;
                      setPrizes(updatedPrizes);
                    }}
                    placeholder={`Judul Hadiah ${index + 1}`}
                  />
                  <Input
                    value={prize.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const updatedPrizes = [...prizes];
                      updatedPrizes[index].value = e.target.value;
                      setPrizes(updatedPrizes);
                    }}
                    placeholder={`Nilai Hadiah ${index + 1}`}
                  />
                </div>
              ))}
              <Button variant="link" onClick={() => setPrizes([...prizes, { title: "", value: "" }])}>Tambah Hadiah</Button>
            </div>

            {/* adding start date end date with date picker  */}
            <div className="mt-4">
              <label>Tanggal Mulai</label>
              <Input
                type="datetime-local"
                value={moment(startDate).format("YYYY-MM-DDTHH:mm")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))}
              />
            </div>
            <div className="mt-4">
              <label>Tanggal Selesai</label>
              <Input
                type="datetime-local"
                value={moment(endDate).format("YYYY-MM-DDTHH:mm")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(new Date(e.target.value))}
              />
            </div>
            {/* Lokasi */}
            <div className="mt-4">
              <label>Lokasi</label>
              <Input
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                placeholder="Masukkan lokasi turnamen"
              />
            </div>
            {/* Status Turnamen */}
            <div className="mt-4 flex items-center gap-4">
              <label>Status Turnamen</label>
              <Switch
                checked={disabled}
                onCheckedChange={(checked: boolean) => setDisabled(checked)}
              />
              <span>{disabled ? "Nonaktif" : "Aktif"}</span>
            </div>
            {/* Harga */}
            <div className="mt-4">
              <label>Harga</label>
              {prices.map((price, index) => (
                <div key={index} className="flex gap-4 mt-2">
                  <Input
                    value={price.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const updatedPrices = [...prices];
                      updatedPrices[index].value = e.target.value;
                      setPrices(updatedPrices);
                    }}
                    placeholder={`Nama Paket ${index + 1}`}
                  />
                  <Input
                    type="text"
                    value={price.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const updatedPrices = [...prices];
                      updatedPrices[index].description = e.target.value;
                      setPrices(updatedPrices);
                    }}
                    placeholder={`Deskripsi ${index + 1}`}
                  />
                  <Input
                    type="number"
                    value={price.amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const updatedPrices = [...prices];
                      updatedPrices[index].amount = parseInt(e.target.value);
                      setPrices(updatedPrices);
                    }}
                    placeholder={`Jumlah Harga ${index + 1}`}
                  />
                </div>
              ))}
              <Button variant="link" onClick={() => setPrices([...prices, { key: prices.length + 1, value: "", amount: 0, description:"" }])}>Tambah Harga</Button>
            </div>
            <div className="mt-4">
              <label>Status</label>
              <select
                value={status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as "UPCOMING" | "ONGOING" | "COMPLETE")}
                className="w-full p-2 border rounded-md"
              >
                <option value="UPCOMING">Akan Datang</option>
                <option value="ONGOING">Sedang Berjalan</option>
                <option value="COMPLETE">Selesai</option>
              </select>
            </div>
          </div>

          {/* Nama Turnamen */}

        </ScrollArea>
        <DrawerFooter>
          <Button onClick={handleCreateOrUpdate} className="ml-3">
            {actionType === "create" ? "Buat Turnamen" : "Perbarui Turnamen"}
          </Button>
          <DrawerClose>  <Button variant="outline">Cancel</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer >
  );
}
