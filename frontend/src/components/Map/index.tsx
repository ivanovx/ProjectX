import React from 'react';
import {
    Pane,
    Circle,
    TileLayer,
    MapContainer
} from 'react-leaflet';

import styles from './map.module.css';

import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';


// TODO
export default function Map({ devices }: { devices: any[] }) {
    const router = useRouter();
    
    const Marker = ({ device }: { device: any }) => {
        const color = "blue";

        const eventHandlers = {
            click: async (event: Event) => {
                console.log(event.target);
                
                const id = (event.target as any).options.id;
            
                router.push(`/stats/${id}`)
            }
        };

        return (
            <Circle
                id={device.id}
                pathOptions={{ color }}
                center={[device.location.longitude, device.location.latitude]} 
                eventHandlers={eventHandlers}
            />
        );
    }

    return (
        <MapContainer center={[42.65, 25.4]} zoom={8} className={styles.Map}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Pane name="devices">
                {devices.map(device => <Marker key={device.id} device={device} />)}
            </Pane>
        </MapContainer>
    );
}

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getDevice } from '@/modules/device.service';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function BasicModal({ device }: { device: any }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}