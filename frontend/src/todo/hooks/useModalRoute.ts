import { Location, useLocation, useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";

export type BackgroundLocation = { background: Location | undefined };

const backgroundLocationState = atom<BackgroundLocation>({
  key: "backgroundLocation",
  default: {
    background: undefined,
  },
});

const useModalRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [backgroundLocation, setBackgroundLocation] = useRecoilState(
    backgroundLocationState
  );

  const editModalPath = (to: string, id: string) => {
    setBackgroundLocation({ background: location });
    navigate(to, {
      state: { background: location, id: id },
    });
  };

  return { editModalPath };
};

export default useModalRoute;
