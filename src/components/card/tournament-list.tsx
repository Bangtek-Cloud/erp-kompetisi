import { TournamentProps } from "@/types/tournament";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { translate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useMemo } from "react";

interface TournamentListProps {
    tournament: TournamentProps;
    openDetail: (tournament: TournamentProps) => void;
    openTerms: (tournament: TournamentProps) => void;
    isAdmin?: boolean;
    isSU?: boolean;
    handleRemoveTournament: (tournamentId: string) => void;
    isDisable?: boolean;
}

export default function TournamentList({
    tournament,
    openDetail,
    openTerms,
    isAdmin,
    isSU,
    handleRemoveTournament,
    isDisable
}: TournamentListProps) {
    if (!tournament) return null;

    const formattedStartDate = useMemo(
        () => DateTime.fromISO(tournament.startDate).setLocale("id").toFormat("dd MMM yyyy"),
        [tournament.startDate]
    );
    const formattedEndDate = useMemo(
        () => DateTime.fromISO(tournament.endDate).setLocale("id").toFormat("dd MMM yyyy"),
        [tournament.endDate]
    );
    const formattedEndDateTime = useMemo(
        () => DateTime.fromISO(tournament.endDate).setLocale("id").toFormat("dd MMM yyyy HH:mm"),
        [tournament.endDate]
    );

    return (
        <Card key={tournament.id} className={isDisable ? "opacity-50" : ""}>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{tournament.name}</CardTitle>
                    <Badge
                        variant="outline"
                        className={
                            isDisable
                                ? "bg-red-100 text-red-800 border-red-200"
                                : tournament.status === "ONGOING"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : tournament.status === "UPCOMING"
                                        ? "bg-blue-100 text-blue-800 border-blue-200"
                                        : "bg-gray-100 text-gray-800 border-gray-200"
                        }
                    >
                        {isDisable ? "Disable" : translate(tournament.status)}
                    </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {formattedStartDate} - {formattedEndDate}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3.5 w-3.5" /> {tournament.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-3.5 w-3.5" /> {tournament.contestants?.filter((a) => a.isVerified).length} Partisipan
                    </div>
                    <p className="text-sm mt-2">{tournament.description}</p>

                    <div className="mt-4 pt-4 border-t">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-lg font-bold">{tournament.maxParticipants === 0 ? '∞' : tournament.maxParticipants}</p>
                                <p className="text-xs text-muted-foreground">Maksimal Partisipan</p>
                            </div>
                            <div>
                                <p className="text-md font-bold">{formattedEndDateTime}</p>
                                <p className="text-xs text-muted-foreground">Selesai</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">{isDisable ? "Disable" : translate(tournament.status)}</p>
                                <p className="text-xs text-muted-foreground">Status</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => openDetail(tournament)}>
                    Hadiah
                </Button>
                {
                    isDisable ? (
                        <Button size="sm" disabled>
                            Daftar
                        </Button>
                    ) : (
                        <Link to={`/apps/tournament/register/${tournament.id}`}>
                            <Button size="sm">
                                Daftar
                            </Button>
                        </Link>
                    )
                }
            </CardFooter>
            <Button variant="link" className="mx-10" size="sm" onClick={() => openTerms(tournament)}>
                Syarat & Ketentuan
            </Button>
            {
                isAdmin && (
                    <div className="mx-10">
                        <Link to={'/apps/tournament/user/' + tournament.id}>
                            <Button className="w-full">
                                Lihat Partisipan
                            </Button>
                        </Link>
                    </div>
                )
            }
            {isAdmin && (
                <div className="border-t border-t mt-4 pt-4">
                    <div className="text-center text-sm text-muted-foreground">
                        Admin Area
                    </div>
                    <div className="flex justify-center gap-2 mt-2">
                        <Link to={`/apps/tournament/update/${tournament.id}`}>
                            <Button variant="link" size="sm">
                                Edit
                            </Button>
                        </Link>
                        {isSU && (
                            <Button variant="link" size="sm" onClick={() => handleRemoveTournament(tournament.id)}>
                                Hapus
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </Card>
    )
}
