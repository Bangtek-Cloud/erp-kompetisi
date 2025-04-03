import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTournamentById } from "@/services/tournament";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const RegisterForTournament: React.FC = () => {
    const id = useParams().technicianId;
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    const { isPending, error, data: tournament } = useQuery({
        queryKey: ['tournament', id],
        queryFn: async () => {
          const response = await getTournamentById(id as string, accessToken || "");
          if (!response) {
            throw new Error("Terjadi kesalahan");
          }
          return response.data;
        },
      })

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        teamName: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        teamName: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: "" })); // Clear error on change
    };

    const validateForm = () => {
        const newErrors: typeof errors = { name: "", email: "", teamName: "" };
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.teamName) newErrors.teamName = "Team name is required";
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            alert("Registration successful!");
        }
    };

    if(isPending) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    if (!tournament) {
        return <div className="flex justify-center items-center h-screen">No tournament found</div>;
    }

    if (tournament.disabled) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Tournament is not open for registration</p>
            </div>
        );
    }

    return (
        <main className="flex-1 container mx-auto p-8">
            <div className=" h-screen">
                <div className="w-full p-6 rounded-lg shadow-lg">
                    <div className="text-center text-md font-semibold text-muted-foreground mb-2">Anda mendaftar untuk acara</div>
                    <h2 className="text-center text-2xl font-bold mb-4">
                        {tournament.name}
                    </h2>
                    <div className="text-center bg-muted-foreground text-sm mb-4 p-3 rounded-lg">
                        <div className="text-red-900 text-xl font-bold">Info acara</div>
                        <p className="text-center text-sm text-red-800 mb-2 mt-4">
                            {tournament.description}
                        </p>
                        <p className="text-center text-sm text-red-800 mb-2">
                            Dimulai {moment(tournament.startDate).format('DD MMM YYYY')} - {moment(tournament.endDate).format('DD MMM YYYY')}
                        </p>
                        <p className="text-center text-sm text-red-800 mb-2">
                            Lokasi turnamen {tournament.location}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your full name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Your email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <Label htmlFor="teamName">Team Name</Label>
                            <Input
                                id="teamName"
                                type="text"
                                placeholder="Your team name"
                                value={formData.teamName}
                                onChange={handleChange}
                            />
                            {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName}</p>}
                        </div>
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default RegisterForTournament;