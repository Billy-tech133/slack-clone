import React from "react";
import styled from "styled-components";
import {
  Apps,
  Inbox,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  FiberManualRecord,
  FileCopy,
  InsertComment,
  PeopleAlt,
  ExpandMore,
  Add,
} from "@material-ui/icons";
import SidebarOption from "./SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Billy Brown</h2>
          <h3>
            <FiberManualRecord />
            {user.name}
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>
      <SidebarBody>
        <SidebarOption Icon={InsertComment} title="Threads" />
        <SidebarOption Icon={Inbox} title="Mentions & Reactions" />
        <SidebarOption Icon={Drafts} title="Saved items" />
        <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
        <SidebarOption Icon={PeopleAlt} title="People & user groups" />
        <SidebarOption Icon={Apps} title="Apps" />
        <SidebarOption Icon={FileCopy} title="File browser" />
        <SidebarOption Icon={ExpandLess} title="Show less" />
        <hr />
        <SidebarOption Icon={ExpandMore} title="Channels" />
        <hr />
        <SidebarOption Icon={Add} addChannelOption title="Add Channels" />

        {channels?.docs.map((doc) => {
          return <SidebarOption id={doc.id} title={doc.data().name} />;
        })}
      </SidebarBody>
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 3px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  height: 100%;
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarBody = styled.div`
  overflow-y: scroll;
`;
const SidebarHeader = styled.div`
  margin-top: 60px;
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
