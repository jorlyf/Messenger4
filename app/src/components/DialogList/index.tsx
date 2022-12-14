import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "@redux/store";
import useAppSelector from "@hooks/useAppSelector";
import { IDialogItem } from "@components/DialogListItem";
import { Dialog, DialogType, Message } from "@entities/local";

export interface IDialogListProps {
  items: IDialogItem[];
  loadMoreItems: () => void;
}

const DialogListContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  const ownerUser = useAppSelector(state => state.profile.user);

  const dialogs = useAppSelector(state => state.dialog.dialogs);
  const dialogsFetched = useAppSelector(state => state.dialog.dialogsInitFetched);
  const currentDialogInfo = useAppSelector(state => state.dialog.currentDialogInfo);
  const totalDialogCount = useAppSelector(state => state.dialog.totalDialogCount);

  const [fetchDialogsAvailable, setFetchDialogsAvailable] = React.useState<boolean>(true);

  const getLastMessage = (messages: Message[]): Message | null => {
    if (messages.length === 0) return null;
    const msg = messages.reduce((x, y) => (x.sentTimestamp > y.sentTimestamp) ? x : y);
    return msg ? msg : null;
  }

  const getDialogNavigateUrl = (d: Dialog) => {
    let prefix: string;
    if (d.type === DialogType.private)
      prefix = "user";
    else
      prefix = "group";

    return `/${prefix}=${d.id}`;
  }

  const loadMoreDialogs = async () => {
    if (!fetchDialogsAvailable) return;
    if (!dialogsFetched) return;

    setFetchDialogsAvailable(false);

    //await DialogService.getMoreDialogs(dispatch, dialogs, totalDialogCount);

    setTimeout(() => {
      setFetchDialogsAvailable(true);
    }, 200);
  }

  const items: IDialogItem[] = React.useMemo(() => {
    return dialogs.map(d => {
      const lastMsg = getLastMessage(d.messages);
      const isCurrentDialog = d.id === currentDialogInfo?.id && d.type === currentDialogInfo.type;
      return {
        id: d.id,
        type: d.type,
        isCurrentDialog: isCurrentDialog,
        onClick: () => { navigate(getDialogNavigateUrl(d)) },
        name: d.name,
        avatarUrl: d.avatarUrl,
        lastMessageText: lastMsg?.text || "",
        isLastMessageMy: lastMsg?.senderUserId === ownerUser?.id,
        lastUpdatedTimestamp: d.lastUpdatedTimestamp
      }
    }).sort((x, y) => y.lastUpdatedTimestamp - x.lastUpdatedTimestamp);
  }, [dialogs, currentDialogInfo, navigate]);

  React.useEffect(() => {
    if (!isAuthorized || !ownerUser || dialogsFetched) return;

    //DialogService.initLoadDialogs();

  }, [isAuthorized, ownerUser, dialogsFetched]);

  return (
    <DialogList
      items={items}
      loadMoreItems={loadMoreDialogs}
    />
  )
}

const DialogList: React.FC<IDialogListProps> = ({ items, loadMoreItems }) => {
  return (
    <div>

    </div>
  )
}

export default DialogListContainer;