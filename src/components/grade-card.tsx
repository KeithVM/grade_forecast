import React from "react";
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ExternalLink } from 'lucide-react';
import '../output.css';

interface GradeCardProps {
    courseName: string;
    grade: string;
    credits: number;
    professor: string;
    lastUpdated: string;
}

export function GradeCard({
    courseName,
    grade,
    credits,
    professor,
    lastUpdated,
}: GradeCardProps) {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                flexShrink: 0,
                            }}
                        >
                            <Typography variant="h4">{grade}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                {courseName}
                                <ExternalLink style={{ marginLeft: 8, height: 16, width: 16, color: 'text.secondary', flexShrink: 0 }} />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {credits} Credits • Last updated {lastUpdated}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {professor}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
