// import BreadCrumbs from "@/components/@extended/BreadCrumbs";
import React from "react";
import { GitHub as GitHubIcon } from "@mui/icons-material";
import { Box, IconButton, Link, useMediaQuery } from "@mui/material";
import Notification from "./Notification";
import Profile from "./Profile";
import Search from "../Search";
import { Theme } from "@mui/material/styles";
import MobileSection from "./MobileSection";
import Translate from "./Translate";
import LayoutSetting from "./LayoutSetting";

interface Props {}
const HeaderContent: React.FC<Props> = () => {
    const matchesXs = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("md")
    );
    return (
        <>
            {!matchesXs && <Search />}
            {matchesXs && <Box sx={{ width: "100%" }} />}
            <IconButton
                component={Link}
                href="https://github.com/iRoySwift/cra-template-framework"
                target="_blank"
                disableRipple
                color="secondary"
                sx={{ color: "text.primary", bgcolor: "grey.100" }}
                title="Download Github">
                <GitHubIcon fontSize="small" />
            </IconButton>
            <Translate />
            <Notification />
            <LayoutSetting />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};
export default HeaderContent;
