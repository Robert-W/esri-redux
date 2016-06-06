declare type HeaderProps = {
  title: string,
  subtitle: string
};

declare type ControlsProps = {
  view: EsriView
};

declare type SpinnerProps = {
  active: bool,
  fill?: string,
  backgroundColor?: string
};

declare type ModalProps = {
  visible: bool
};

declare type ModalWrapperProps = {
  visible: bool,
  close: Function,
  theme?: string,
  children?: any
};
