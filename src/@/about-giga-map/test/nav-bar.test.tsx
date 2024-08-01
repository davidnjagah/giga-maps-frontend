import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NavBar from '../Sections/nav-bar';

describe('NavBar Component', () => {
  const mockData = {
    id: 1,
    text: ['Test'],
    type: 'link',
    status: true,
    order: 1,
    cta: { link: ['/map'], text: ['Learn More'] },
    image: 'https://saunigigaweb.blob.core.windows.net/giga-maps-backend-dev-public/images/cb793b0a-89f2-4767-8f18-a73ffe6012bc.png',
    content: [
      { logo: "<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 1000 210\">\n  <defs>\n    <style>\n      .cls-1 {\n        fill: #fff;\n        stroke-width: 0px;\n      }\n    </style>\n  </defs>\n  <path class=\"cls-1\" d=\"M69.3,79.4h57.2v70.8c-15,6.4-31.9,9.6-50.6,9.6s-43.2-6.9-56.3-20.7C6.5,125.1,0,105.5,0,80.2s3.2-29.8,9.7-42c6.5-12.2,15.7-21.6,27.8-28.3C49.6,3.3,63.4,0,79.1,0s32.1,3.1,45.5,9.3l-4.3,9.8c-13.4-6.2-27.4-9.3-41.8-9.3-20.4,0-36.7,6.3-48.7,18.9-12,12.6-18,29.7-18,51.1s5.7,40.9,17.1,52.7,28.1,17.7,50.2,17.7,26.4-2,36.4-6v-54.5h-46.2v-10.2Z\"/>\n  <path class=\"cls-1\" d=\"M158.4,10.2c0-6.8,2.2-10.2,6.7-10.2s3.9.9,5.1,2.7c1.2,1.8,1.9,4.3,1.9,7.5s-.6,5.7-1.9,7.5-3,2.8-5.1,2.8c-4.5,0-6.7-3.4-6.7-10.3ZM170.3,157.6h-10.5V42.2h10.5v115.3Z\"/>\n  <path class=\"cls-1\" d=\"M295.1,42.2v7.3l-23.9,1.5c6.4,7.9,9.6,16.6,9.6,26.1s-3.7,20.1-11.1,27c-7.4,6.9-17.3,10.3-29.8,10.3s-8.9-.2-11-.6c-4.2,2.2-7.4,4.8-9.6,7.7s-3.3,6.1-3.3,9.4,1.4,6.4,4.2,8.1c2.8,1.7,7.5,2.5,14.1,2.5h20.2c12.5,0,22.1,2.5,28.8,7.6,6.6,5.1,10,12.5,10,22.4s-4.9,21.6-14.8,28.2c-9.9,6.6-23.9,9.9-42.2,9.9s-25.7-2.8-33.7-8.4c-8-5.6-11.9-13.4-11.9-23.3s2.5-14.5,7.4-19.7c4.9-5.2,11.6-8.8,20-10.7-3.5-1.5-6.2-3.6-8.3-6.3-2.1-2.7-3.1-5.9-3.1-9.4,0-7.7,4.9-14.5,14.7-20.4-6.7-2.8-12-7.1-15.7-13-3.7-5.9-5.6-12.7-5.6-20.3,0-11.5,3.7-20.8,11-27.7,7.3-7,17.2-10.4,29.7-10.4s13.4.7,17.6,2.2h36.9ZM201.7,177.1c0,15.8,11.8,23.8,35.3,23.8s45.4-9.7,45.4-29-2.4-12-7.1-15.1c-4.7-3.1-12.4-4.7-23-4.7h-18.9c-21.2,0-31.7,8.3-31.7,24.9ZM210.5,78.2c0,8.9,2.7,15.8,8.1,20.7,5.4,4.9,12.6,7.4,21.7,7.4s17-2.4,22.1-7.3,7.7-12,7.7-21.2-2.6-17.2-7.9-22.1c-5.3-4.9-12.6-7.4-22.1-7.4s-16.4,2.6-21.7,7.9c-5.3,5.3-7.9,12.6-7.9,22Z\"/>\n  <path class=\"cls-1\" d=\"M386,157.6l-2.7-18.3h-.8c-5.8,7.4-11.8,12.7-17.9,15.8-6.1,3.1-13.4,4.6-21.7,4.6s-20.1-2.9-26.4-8.7c-6.3-5.8-9.4-13.8-9.4-24.1s4.7-20,14.1-26.2c9.4-6.2,22.9-9.5,40.7-9.9l22-.6v-7.6c0-11-2.2-19.2-6.7-24.8-4.5-5.6-11.6-8.4-21.5-8.4s-21.7,3-33.2,8.9l-3.9-9.1c12.7-5.9,25.2-8.9,37.6-8.9s22.1,3.3,28.4,9.9c6.3,6.6,9.4,16.8,9.4,30.8v76.7h-7.7ZM343.6,150.1c12.3,0,22-3.5,29.1-10.6,7.1-7,10.7-16.8,10.7-29.3v-11.4l-20.2.8c-16.2.8-27.7,3.3-34.6,7.6-6.9,4.3-10.3,11-10.3,20s2.2,12.8,6.6,16.8c4.4,4,10.7,6,18.7,6Z\"/>\n  <path class=\"cls-1\" d=\"M516.5,157.6l-37.4-121.7h-1c1.3,24.8,2,41.3,2,49.6v72.2h-29.4V2.4h44.8l36.7,118.6h.6L571.9,2.4h44.8v155.1h-30.7v-73.4c0-3.5,0-7.5.2-12,.1-4.5.6-16.6,1.4-36.1h-1l-40,121.5h-30.1Z\"/>\n  <path class=\"cls-1\" d=\"M724.6,157.6l-6.3-16.1h-.8c-5.5,6.9-11.1,11.6-16.8,14.3-5.8,2.7-13.3,4-22.5,4s-20.4-3.3-26.9-9.8c-6.5-6.5-9.8-15.8-9.8-27.8s4.4-21.9,13.2-27.9c8.8-6,22.1-9.3,39.8-9.9l20.6-.6v-5.2c0-12-6.2-18-18.5-18s-20.6,2.9-33.4,8.6l-10.7-21.9c13.7-7.1,28.8-10.7,45.4-10.7s28.1,3.5,36.6,10.4c8.5,6.9,12.7,17.5,12.7,31.6v79.1h-22.6ZM715.1,102.6l-12.5.4c-9.4.3-16.4,2-21,5.1-4.6,3.1-6.9,7.8-6.9,14.2,0,9.1,5.2,13.7,15.7,13.7s13.5-2.2,18-6.5c4.5-4.3,6.7-10,6.7-17.2v-9.8Z\"/>\n  <path class=\"cls-1\" d=\"M842.2,159.7c-13.9,0-24.9-5.1-32.8-15.2h-1.7c1.1,9.9,1.7,15.6,1.7,17.2v48.1h-32.4V38.9h26.3l4.6,15.4h1.5c7.6-11.7,18.8-17.6,33.6-17.6s25,5.4,32.9,16.2c7.9,10.8,11.9,25.9,11.9,45.1s-1.9,23.7-5.6,33-9,16.4-15.9,21.3-14.9,7.3-24.2,7.3ZM832.7,62.6c-8,0-13.8,2.5-17.5,7.4-3.7,4.9-5.6,13-5.7,24.4v3.5c0,12.7,1.9,21.9,5.7,27.4,3.8,5.5,9.8,8.3,18,8.3,14.5,0,21.8-12,21.8-35.9s-1.8-20.4-5.4-26.3c-3.6-5.8-9.2-8.8-16.8-8.8Z\"/>\n  <path class=\"cls-1\" d=\"M996.3,122.3c0,12.2-4.2,21.4-12.7,27.8-8.5,6.4-21.1,9.6-37.9,9.6s-16-.6-22.1-1.7c-6.1-1.2-11.8-2.9-17.1-5.1v-26.7c6,2.8,12.8,5.2,20.3,7.1,7.5,1.9,14.2,2.9,19.9,2.9,11.7,0,17.6-3.4,17.6-10.2s-.8-4.6-2.3-6.2-4.2-3.4-8.1-5.4c-3.8-2-8.9-4.4-15.3-7.1-9.1-3.8-15.8-7.4-20.1-10.6s-7.4-7-9.3-11.2c-1.9-4.2-2.9-9.4-2.9-15.5,0-10.5,4.1-18.7,12.3-24.5,8.2-5.8,19.8-8.6,34.8-8.6s28.2,3.1,41.7,9.3l-9.8,23.3c-5.9-2.5-11.5-4.6-16.7-6.3s-10.4-2.4-15.8-2.4c-9.5,0-14.3,2.6-14.3,7.7s1.5,5.4,4.6,7.5c3.1,2.1,9.8,5.3,20.2,9.4,9.3,3.7,16.1,7.3,20.4,10.5,4.3,3.3,7.5,7,9.6,11.2,2.1,4.2,3.1,9.3,3.1,15.2Z\"/>\n</svg>" },
      { name: 'Impact', target: 'gigamaps-enabled,slides' },
      { name: 'Resources', target: 'resources' },
      { name: 'FAQs', target: 'faqs' },
      { name: 'Partners', target: 'partners,eleventh' },
      { name: 'Get in touch', target: 'live-map-get-in-touch' },
    ]
  };

  it('renders Navbar snapshot', () => {
    const { asFragment } = render(<NavBar data={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays Giga logo', () => {
    render(<NavBar data={mockData} />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('toggles menu in mobile view', () => {
    render(<NavBar data={mockData} />);
    fireEvent.click(screen.getByLabelText('Menu'));
    expect(screen.getByText('Impact')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('FAQs')).toBeInTheDocument();
    expect(screen.getByText('Partners')).toBeInTheDocument();
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByText('Impact')).not.toBeInTheDocument();
    expect(screen.queryByText('Resources')).not.toBeInTheDocument();
    expect(screen.queryByText('FAQs')).not.toBeInTheDocument();
    expect(screen.queryByText('Partners')).not.toBeInTheDocument();
    expect(screen.queryByText('Get in touch')).not.toBeInTheDocument();
  });

  it('renders external link button', () => {
    render(<NavBar data={mockData} />);
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });
});
